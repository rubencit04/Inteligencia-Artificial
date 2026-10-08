/**
 * Retrieve news articles related to a specific stock symbol. Requires env vars: token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "News",
  "request": {
    "method": "GET",
    "url": {
      "raw": "https://api.marketdata.app/v1/stocks/news/:symbol",
      "protocol": "https",
      "host": [
        "api",
        "marketdata",
        "app"
      ],
      "path": [
        "v1",
        "stocks",
        "news",
        ":symbol"
      ],
      "query": [
        {
          "key": "from",
          "value": "2023-01-01",
          "description": "The earliest news to include in the output. If you use countback, from is not required. Accepted timestamp inputs: ISO 8601, unix, spreadsheet.",
          "disabled": true
        },
        {
          "key": "to",
          "value": "2023-01-31",
          "description": "The latest news to include in the output. Accepted timestamp inputs: ISO 8601, unix, spreadsheet.",
          "disabled": true
        },
        {
          "key": "countback",
          "value": "5",
          "description": "Countback will fetch a specific number of news before to. If you use from, countback is not required.",
          "disabled": true
        },
        {
          "key": "date",
          "value": "2023-12-31",
          "description": "Retrieve news for a specific day. Accepted timestamp inputs: ISO 8601, unix, spreadsheet.",
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
          "description": "The dateformat parameter allows you specify the format you wish to receive date and time information in.",
          "disabled": true
        },
        {
          "key": "limit",
          "value": "252",
          "description": "The limit parameter allows you to limit the number of results for a particular API call or override an endpoint’s default limits to get more data.\n\nDefault Limit: 10,000\nMaximum Limit: 50,000",
          "type": "text",
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
          "value": "date,close",
          "description": "The columns parameter is used to limit the results and only request the columns you need. The most common use of this feature is to embed a single numeric result from one of the end points in a spreadsheet cell.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "headers",
          "value": "false",
          "description": "The headers parameter is used to turn off headers when using CSV output.",
          "disabled": true
        },
        {
          "key": "human",
          "value": "true",
          "description": "Use human-readable attribute names in the JSON or CSV output instead of the standard camelCase attribute names.",
          "disabled": true
        }
      ],
      "variable": [
        {
          "id": "f603f3ee-696f-4e1c-befe-faaf7ba86469",
          "key": "symbol",
          "value": "AAPL",
          "description": "The company's ticker symbol. If no exchange is specified, by default a US exchange will be assumed. You may embed the exchange in the ticker symbol using the Yahoo Finance or TradingView formats. A company or securities identifier can also be used instead of a ticker symbol."
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
const executeFunction = async ({ symbol }) => {
  return executeRequest(requestDefinition, { symbol }, collectionVariables);
};

/**
 * Tool definition for News
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'news',
      description: 'Retrieve news articles related to a specific stock symbol. Requires env vars: token',
      parameters: {
        type: 'object',
        properties: {
          'symbol': {
            type: 'string',
            description: 'The symbol parameter'
          }
        },
        required: ['symbol']
      }
    }
  }
};
