//TODO Replace with the correct link

// Request will just require getting top 10 news articles
// Response will give us numResults, the title, description and urlToImage

import { MarketNewsLink, StockNewsLink } from '../api-links/constants';

const token = localStorage.getItem('token');

export async function getNews(ticker) {
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
            console.log("Could not fetch news.", response);
            return Promise.reject("Could not fetch news on your stock. Please try again.");
        }
    })
}

/**
 * getMarketNews - Gets the news on the top 10 most active stocks
 * @returns List of lists, where each list represets articles for one of the most active stocks
 */
export async function getMarketNews() {
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
                console.log("MARKET NEWS:", news); // TODO - remove this console log
                return Promise.resolve(news);
            })
        } else if (response.status === 403) {
            return Promise.reject("Expired token");
        } else {
            console.log("Could not fetch news.", response);
            return Promise.reject("Could not get market news. Please refresh.");
        }
    })
}