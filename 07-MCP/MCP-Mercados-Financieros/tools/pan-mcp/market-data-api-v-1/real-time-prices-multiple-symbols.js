/**
 * Fetch real-time prices for multiple stocks or ETFs. Requires env vars: token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Real-Time Prices (Multiple Symbols)",
  "request": {
    "method": "GET",
    "url": {
      "raw": "https://api.marketdata.app/v1/stocks/prices/?symbols=AAPL,META,MSFT",
      "protocol": "https",
      "host": [
        "api",
        "marketdata",
        "app"
      ],
      "path": [
        "v1",
        "stocks",
        "prices",
        ""
      ],
      "query": [
        {
          "key": "symbols",
          "value": "AAPL,META,MSFT",
          "description": "Comma-separated list of ticker symbols.",
          "type": "text"
        },
        {
          "key": "extended",
          "value": "false",
          "description": "Control the inclusion of extended hours data in the price output. Defaults to true if omitted.",
          "disabled": true
        },
        {
          "key": "------------------------------",
          "value": "------------------------------",
          "description": "------------------------------\nThe following paramters are universal to the API and not specific to this endpoint.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "dateformat",
          "value": "timestamp",
          "description": "The dateformat parameter allows you specify the format you wish to receive date and time information in.",
          "disabled": true
        },
        {
          "key": "format",
          "value": "",
          "description": "The format parameter is used to specify the format for your data. We support JSON and CSV formats. The default format is JSON.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "limit",
          "value": "",
          "description": "The limit parameter allows you to limit the number of results for a particular API call or override an endpoint’s default limits to get more data.",
          "disabled": true
        },
        {
          "key": "offset",
          "value": "",
          "description": "The offset parameter is used together with limit to allow you to implement pagination in your application. Offset will allow you to return values starting at a certain value.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "columns",
          "value": "bid,ask,updated",
          "description": "The columns parameter is used to limit the results and only request the columns you need. The most common use of this feature is to embed a single numeric result from one of the end points in a spreadsheet cell.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "headers",
          "value": "",
          "description": "The headers parameter is used to turn off headers when using CSV output.",
          "disabled": true
        },
        {
          "key": "human",
          "value": "",
          "description": "Use human-readable attribute names in the JSON or CSV output instead of the standard camelCase attribute names.",
          "type": "text",
          "disabled": true
        }
      ]
    },
    "header": [],
    "body": null,
    "auth": {
      "type": "bearer",
      "bearer": [
        {
          "key": "token",
          "value": "{{pan_mcp_token}}",
          "type": "string"
        }
      ]
    }
  }
};

// Collection variables (will be merged with environment)
const collectionVariables = [];

/**
 * Executes the API request
 *
 * @param {Object} args - Function arguments
 * @returns {Promise<Object>} API response
 */
const executeFunction = async ({}) => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

/**
 * Tool definition for Real-Time Prices (Multiple Symbols)
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'real_time_prices_multiple_symbols',
      description: 'Fetch real-time prices for multiple stocks or ETFs. Requires env vars: token',
      parameters: {
        type: 'object',
        properties: {

        },
        required: []
      }
    }
  }
};
