//TODO Replace with the correct link

// Request will just require getting top 10 news articles
// Response will give us numResults, the title, description and urlToImage

import { MarketNewsLink, StockNewsLink } from '../api-links/constants';

export async function getNews(ticker) {
    const body = {
        ticker: ticker,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    return await fetch(`${StockNewsLink}`, requestOptions)
    .then(response => response.json())    
    .then((news) => {
        return Promise.resolve(news);
    }).catch((error) => {
        console.log("Could not fetch news.", error);
        return Promise.reject(error);
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
        },
    }
    return await fetch(`${MarketNewsLink}`, requestOptions)
        .then((response) => response.json())
        .then(marketNews => {
            console.log("MARKET NEWS:", marketNews);
            return Promise.resolve(marketNews);
        }).catch(error => {
            console.log("Could not fetch market news", error);
            return Promise.reject(error);
        })
}