import { 
    MarketsLink, 
    StockDetailLink, 
    StockPriceLink
} from '../api-links/constants';

export async function getMarketData(type, page_num) {
    // TODO - Add page_num to the variables
    const requestBody = {
        type: type,
        page_num: page_num,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };
    // TODO - change link to `${MarketsLink}?=${page_num}`
    return await fetch(`${MarketsLink}`, requestOptions).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.json());
        }
        return Promise.reject(response);
    })

}

async function getStockDetail(ticker) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ticker: ticker,
        })
    };
    return await fetch(StockDetailLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            console.log('error for this ticker: ', ticker);
            return Promise.reject(response);
        })
}

async function getStockPrice(ticker, typeInterval) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
            console.log('error');
            return Promise.reject(response);
        })
}

export const market = {
    getMarketData,
    getStockDetail,
    getStockPrice
}