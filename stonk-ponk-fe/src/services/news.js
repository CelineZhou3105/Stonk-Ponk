import { MarketNewsLink, StockNewsLink } from '../api-links/constants';

/**
 * getNews - gets the news for a particular ticker
 * @param {string} ticker - unique identifier for the stock 
 * @returns List of objects where each object represents an article
 */
export async function getNews(ticker) {
    const token = localStorage.getItem('token');
    const body = {
        ticker: ticker,
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(body)
    };

    return await fetch(`${StockNewsLink}`, requestOptions)
    .then(response => {
        if (response.status === 200) {
            return response.json().then(res => {
                return Promise.resolve(res);
            })
        } else if (response.status === 403) {
            return Promise.reject("Expired token");
        } else {
            return Promise.reject("Could not fetch news on your stock. Please try again.");
        }
    })
}

/**
 * getMarketNews - Gets the news on the top 10 most active stocks
 * @returns List of lists, where each list represents articles for one of the most active stocks
 */
export async function getMarketNews() {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }
    return await fetch(`${MarketNewsLink}`, requestOptions)
    .then(response => {
        if (response.status === 200) {
            return response.json().then(news => {
                return Promise.resolve(news);
            })
        } else if (response.status === 403) {
            return Promise.reject("Expired token");
        } else {
            return Promise.reject("Could not get market news. Please refresh.");
        }
    })
}