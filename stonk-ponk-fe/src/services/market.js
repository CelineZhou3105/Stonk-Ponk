import { 
    MarketsLink, 
    StockDetailLink, 
    StockPriceLink,
    StockCheckLink
} from '../api-links/constants';

/**
 * getMarketData - gets financial data of the best, worst and most active stocks on the market
 * @param {string} type - type of data you want to query for (can be 'most_active', 'losers', 'gainers')
 * @param {number} page_num - the page number for pagination (e.g. page 0 will get the first 10 results)
 * @return - 10 most active stocks, losers or gainers
 */
export async function getMarketData(type, page_num) {
    const token = localStorage.getItem('token');
    const requestBody = {
        type: type,
        page_num: page_num,
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(requestBody)
    };
    return await fetch(`${MarketsLink}`, requestOptions).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.json());
        } else if (response.status === 403) {
            console.log("Unauthorised token. Session has expired.");
            return Promise.reject("Expired token");
        } else {
            return Promise.reject("There was an error getting market data. Please refresh.");
        }   
    })

}

/**
 * getStockDetail - Gets details of a particular stock by it's ticker
 * @param {string} ticker - the unique ticker for the stock
 * @returns - an object containing details of the stock (name, ticker, open, bid, call, price)
 */
async function getStockDetail(ticker) {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            ticker: ticker,
        }),
    };

    return await fetch(StockDetailLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            else if (response.status === 403) {
                console.log("Unauthorised token. Session has expired.");
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("There was an error getting the details of this stock. Please refresh.");
            } 
        })
}

/**
 * getStockPrice - gets the historical prices of the stock based on ticker 
 * @param {string} ticker - the unique identifier for the stock
 * @param {string} typeInterval - the interval to query for (can be 'last_week', 'last_month', 'last_year')
 * @return - An array containing a series of objects with date, and the associated price on that date
 */
async function getStockPrice(ticker, typeInterval) {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            ticker: ticker,
            interval_type: typeInterval,
        })
    };

    return await fetch(StockPriceLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            else if (response.status === 403) {
                console.log("Unauthorised token. Session has expired.");
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("There was an error getting the historical prices of this stock. Please refresh.");
            } 
        })
}

/**
 * checkTickerExists - checks if a stock exists, given the provided ticker
 * @param {string} ticker - the unique identifier for the stock
 * @param {AbortController} abortController - (optional) an abortController object which aborts the network call (optional)
 */
async function checkTickerExists(ticker, abortController) {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            ticker: ticker,
        })
    };

    if (abortController) {
        requestOptions['signal'] = abortController.signal;
    }

    return await fetch(StockCheckLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            else if (response.status === 403) {
                console.log("Unauthorised token. Session has expired.");
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("There was an error checking if this stock exists.");
            } 
        })
}

export const market = {
    checkTickerExists,
    getMarketData,
    getStockDetail,
    getStockPrice
}
