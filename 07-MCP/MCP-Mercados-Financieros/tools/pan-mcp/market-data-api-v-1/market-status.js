/**
 * Retrieve the current market status (open/closed) for stock trading days. Requires env vars: token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Market Status",
  "request": {
    "method": "GET",
    "url": {
      "raw": "https://api.marketdata.app/v1/markets/status/",
      "protocol": "https",
      "host": [
        "api",
        "marketdata",
        "app"
      ],
      "path": [
        "v1",
        "markets",
        "status",
        ""
      ],
      "query": [
        {
          "key": "country",
          "value": "us",
          "description": "Use to specify the country. Use the two digit ISO 3166 country code. If no country is specified, US will be assumed. Only countries that Market Data supports for stock price data are available (currently only the United States).",
          "type": "text",
          "disabled": true
        },
        {
          "key": "from",
          "value": "2024-01-01",
          "description": "The earliest date (inclusive). If you use countback, from is not required. Accepted timestamp inputs: ISO 8601, unix, spreadsheet, relative date strings.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "to",
          "value": "today",
          "description": "The last date (inclusive). Accepted timestamp inputs: ISO 8601, unix, spreadsheet, relative date strings.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "countback",
          "value": "5",
          "description": "Countback will fetch a number of dates before to If you use from, countback is not required.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "------------------------------",
          "value": "------------------------------",
          "description": "------------------------------\nThe following parameters are universal to the API and not specific to this endpoint.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "format",
          "value": "csv",
          "description": "The format parameter is used to specify the format for your data. We support JSON and CSV formats. The default format is JSON.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "dateformat",
          "value": "timestamp",
          "description": "The dateformat parameter allows you specify the format you wish to receive date and time information in.\n\ndateformat={timestamp|unix|spreadsheet}",
          "disabled": true
        },
        {
          "key": "limit",
          "value": "10",
          "description": "The limit parameter allows you to limit the number of results for a particular API call or override an endpoint’s default limits to get more data.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "offset",
          "value": "",
          "description": "The offset parameter is used together with limit to allow you to implement pagination in your application. Offset will allow you to return values starting at a certain value.",
          "disabled": true
        },
        {
          "key": "columns",
          "value": "",
          "description": "The columns parameter is used to limit the results of any endpoint to only the columns you need.",
          "disabled": true
        },
        {
          "key": "headers",
          "value": "false",
          "description": "The headers parameter is used to turn off headers when using CSV output.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "human",
          "value": "true",
          "description": "The human parameter will use human-readable attribute names in the JSON or CSV output instead of the standard camelCase attribute names. Use of this parameter will result in API output that can be loaded directly into a table or viewer and presented to an end-user with no further transformation required on the front-end.",
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
 * Tool definition for Market Status
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'market_status',
      description: 'Retrieve the current market status (open/closed) for stock trading days. Requires env vars: token',
      parameters: {
        type: 'object',
        properties: {

        },
        required: []
      }
    }
  }
};
