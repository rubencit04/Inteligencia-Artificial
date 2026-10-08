/**
 * Postman Runtime Executor
 *
 * Executes Postman requests using postman-runtime, ensuring full compatibility
 * with all Postman features including complex authentication types.
 *
 * Variables are resolved in this order (later overrides earlier):
 * 1. Collection variables (embedded in tool)
 * 2. Environment variables (process.env)
 * 3. Function parameters (runtime arguments)
 */
import postmanCollection from 'postman-collection';
const { Item } = postmanCollection;
import postmanRuntime from 'postman-runtime';
const Runtime = postmanRuntime;

/**
 * Generates name variations for a variable to handle inconsistent naming.
 * E.g., access_token → [access_token, accessToken, ACCESS_TOKEN, access-token]
 *
 * @param {string} name - Original variable name
 * @returns {string[]} Array of name variations
 */
function generateNameVariations(name) {
  if (!name) return [];

  const variations = new Set();
  variations.add(name);

  // Normalize to snake_case first
  const snakeCase = name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  variations.add(snakeCase);

  // Generate camelCase
  const camelCase = snakeCase.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  variations.add(camelCase);

  // Generate PascalCase
  const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  variations.add(pascalCase);

  // Generate UPPER_SNAKE_CASE
  variations.add(snakeCase.toUpperCase());

  // Generate kebab-case
  const kebabCase = snakeCase.replace(/_/g, '-');
  variations.add(kebabCase);

  return Array.from(variations);
}

/**
 * Executes a Postman request definition
 *
 * @param {Object} requestDef - Postman request definition (v2.1 format)
 * @param {Object} variables - Runtime variables to inject (function parameters)
 * @param {Array} collectionVariables - Collection-level variables [{key, value}]
 * @returns {Promise<Object>} The response body (parsed JSON or text)
 */
export async function executeRequest(requestDef, variables = {}, collectionVariables = []) {
  return new Promise((resolve, reject) => {
    const item = new Item(requestDef);

    // Inject Authorization: Bearer header if gateway forwarded an auth token
    const authToken = variables.__auth_token || process.env.__MCP_AUTH_TOKEN;
    if (authToken) {
      const hasAuth = item.request.headers.members &&
        item.request.headers.members.some(h => h.key && h.key.toLowerCase() === 'authorization');
      if (!hasAuth) {
        item.request.addHeader({ key: 'Authorization', value: `Bearer ${authToken}` });
      }
    }

    const runner = new Runtime.Runner();

    // Build environment values with proper precedence
    // Order: collection vars < env vars < function params
    const envValues = [];

    // 1. Add collection variables first (lowest precedence)
    if (Array.isArray(collectionVariables)) {
      collectionVariables.forEach(({ key, value }) => {
        if (key) {
          envValues.push({ key, value: String(value || ''), type: 'text' });
        }
      });
    }

    // 2. Add environment variables (medium precedence)
    // These will override collection variables with the same name
    // Also add name variations to handle inconsistent variable naming in collections
    Object.entries(process.env).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        // Add original key
        envValues.push({ key, value, type: 'text' });

        // Generate and add name variations for better compatibility
        const variations = generateNameVariations(key);
        variations.forEach((variantKey) => {
          if (variantKey !== key) {
            envValues.push({ key: variantKey, value, type: 'text' });
          }
        });
      }
    });

    // 3. Add runtime variables (function parameters) - highest precedence
    // These override both collection and env vars
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined) {
        envValues.push({ key, value: String(value), type: 'text' });
      }
    });

    const runOptions = {
      environment: {
        values: envValues
      },
      timeout: {
        request: 30000 // 30 second timeout
      },
      insecureFileRead: false,
      fileResolver: null,
      // Disable certificate verification for development
      // In production, this should be configurable
      requester: {
        strictSSL: process.env.NODE_ENV === 'production'
      }
    };

    runner.run(item, runOptions, (err, run) => {
      if (err) {
        return reject(new Error(`Failed to initialize request: ${err.message}`));
      }

      let responseData = null;
      let requestError = null;

      run.start({
        // Called when a request is about to be sent
        beforeRequest: (err, cursor, request, item) => {
          if (err) {
            console.error('[Postman Runtime] Before request error:', err);
          }
        },

        // Called when a response is received
        response: (err, cursor, response, request, item, cookies) => {
          if (err) {
            requestError = err;
            return;
          }

          if (response) {
            const statusCode = response.code;
            const body = response.stream ? response.stream.toString() : '';

            // Check for HTTP errors
            if (statusCode >= 400) {
              requestError = new Error(`HTTP ${statusCode}: ${body}`);
              return;
            }

            // Try to parse as JSON
            try {
              responseData = JSON.parse(body);
            } catch {
              // If not JSON, return as text
              responseData = body;
            }
          }
        },

        // Called when execution is complete
        done: (err, summary) => {
          if (err) {
            return reject(new Error(`Request execution failed: ${err.message}`));
          }

          if (requestError) {
            return reject(requestError);
          }

          if (responseData === null) {
            return reject(new Error('No response received from server'));
          }

          resolve(responseData);
        }
      });
    });
  });
}

/**
 * Executes a Postman request with retry logic
 *
 * @param {Object} requestDef - Postman request definition
 * @param {Object} variables - Runtime variables
 * @param {Array} collectionVariables - Collection-level variables
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum retry attempts (default: 3)
 * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
 * @returns {Promise<Object>} The response body
 */
export async function executeRequestWithRetry(requestDef, variables = {}, collectionVariables = [], options = {}) {
  const maxRetries = options.maxRetries || 3;
  const retryDelay = options.retryDelay || 1000;

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await executeRequest(requestDef, variables, collectionVariables);
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.message && error.message.startsWith('HTTP 4')) {
        throw error;
      }

      if (attempt < maxRetries) {
        console.warn(`[Postman Runtime] Request failed (attempt ${attempt}/${maxRetries}): ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  }

  throw lastError;
}
