/**
 * Get historical price candles for a stock at a specified resolution. Requires env vars: token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Historical Candles",
  "request": {
    "method": "GET",
    "url": {
      "raw": "https://api.marketdata.app/v1/stocks/candles/:resolution/:symbol",
      "protocol": "https",
      "host": [
        "api",
        "marketdata",
        "app"
      ],
      "path": [
        "v1",
        "stocks",
        "candles",
        ":resolution",
        ":symbol"
      ],
      "query": [
        {
          "key": "from",
          "value": "2023-01-01",
          "description": "The leftmost candle on a chart (inclusive). If you use countback, to is not required. Accepted timestamp inputs: ISO 8601, unix, spreadsheet.",
          "disabled": true
        },
        {
          "key": "to",
          "value": "2023-01-31",
          "description": "The rightmost candle on a chart (inclusive). Accepted timestamp inputs: ISO 8601, unix, spreadsheet.",
          "disabled": true
        },
        {
          "key": "countback",
          "value": "252",
          "description": "Will fetch a number of candles before (to the left of) to. If you use from, countback is not required.",
          "disabled": true
        },
        {
          "key": "exchange",
          "value": null,
          "description": "Use to specify the exchange of the ticker. This is useful when you need to specify stock that quotes on several exchanges with the same symbol. You may specify the exchange using the EXCHANGE ACRONYM, MIC CODE, or two digit YAHOO FINANCE EXCHANGE CODE. If no exchange is specified symbols will be matched to US exchanges first.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "extended",
          "value": "true",
          "description": "Include extended hours trading sessions when returning intraday candles. Daily resolutions never return extended hours candles. The default is false.",
          "disabled": true
        },
        {
          "key": "country",
          "value": "US",
          "description": "Use to specify the country of the exchange (not the country of the company) in conjunction with the symbol argument. This argument is useful when you know the ticker symbol and the country of the exchange, but not the exchange code. Use the two digit ISO 3166 country code. If no country is specified, US exchanges will be assumed.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "adjustsplits",
          "value": "true",
          "description": "Adjust historical data for for historical splits and reverse splits. Market Data uses the CRSP methodology for adjustment. Daily candles default: true. Intraday candles default: false.",
          "type": "text",
          "disabled": true
        },
        {
          "key": "adjustdividends",
          "value": "false",
          "description": "Adjust candles for dividends. Market Data uses the CRSP methodology for adjustment. Daily candles default: true. Intraday candles default: false.",
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
          "value": null,
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
          "id": "386d05d7-9f2d-4418-ba55-0143adb2ec72",
          "key": "resolution",
          "value": "D",
          "description": "The duration of each candle.\n\nMinutely Resolutions: (minutely, 1, 3, 5, 15, 30, 45, ...)\nHourly Resolutions: (hourly, H, 1H, 2H, ...)\nDaily Resolutions: (daily, D, 1D, 2D, ...)\nWeekly Resolutions: (weekly, W, 1W, 2W, ...)\nMonthly Resolutions: (monthly, M, 1M, 2M, ...)\nYearly Resolutions:(yearly, Y, 1Y, 2Y, ...)"
        },
        {
          "id": "335e5d12-a60a-4304-8d74-723400a40e3f",
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
const executeFunction = async ({ resolution, symbol }) => {
  return executeRequest(requestDefinition, { resolution, symbol }, collectionVariables);
};

/**
 * Tool definition for Historical Candles
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'historical_candles',
      description: 'Get historical price candles for a stock at a specified resolution. Requires env vars: token',
      parameters: {
        type: 'object',
        properties: {
          'resolution': {
            type: 'string',
            description: 'The resolution parameter'
          },
          'symbol': {
            type: 'string',
            description: 'The symbol parameter'
          }
        },
        required: ['resolution', 'symbol']
      }
    }
  }
};
