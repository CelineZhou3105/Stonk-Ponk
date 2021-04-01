import { 
    EditPortfolio, 
    GetPortfolioSummary, 
    GetPortfolioBestStocks, 
    GetPortfolioWorstStocks 
} from '../api-links/constants';

/**
 * getPortfolioSummary - sends a request to get the user's portfolio summary (pie chart, )
 * @param {string} token - token of the logged in user
 */
export async function getPortfolioSummary(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };
    return await fetch(GetPortfolioSummary, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Successfully got portfolio");
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else {
                response.json().then(res => {
                    return Promise.reject(res.message);
                })
                
            }
        });
}

/**
 * editPortfolio - sends a request to save the user's portfolio new state
 * @param {string} token - token of the logged in user
 * @param {Array} data - list of stocks in the portfolio 
 */
export async function editPortfolio(token, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data)
    };

    return await fetch(EditPortfolio, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Successful edit.");
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else {
                return response.json().then(res => {
                    return Promise.reject(res.message);
                })
                
            }
        });
}

/**
 * getPortfolioBest - sends a request to get the user's best stocks
 * @param {string} token - token of the logged in user
 * @param {number} num_stocks - the number of stocks to return
 */
export async function getPortfolioBest(token, num_stocks) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };

    return await fetch(GetPortfolioBestStocks + "?n=" + num_stocks, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Best stocks successfully retrieved.");
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else {
                return response.json().then(res => {
                    return Promise.reject(res.message);
                })
                
            }
        });
}

/**
 * getPortfolioWorst - sends a request to get the user's worst stocks
 * @param {string} token - token of the logged in user
 * @param {number} num_stocks - the number of stocks to return
 */
export async function getPortfolioWorst(token, num_stocks) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };

    return await fetch(GetPortfolioWorstStocks + "?n=" + num_stocks, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Worst stocks successfully retrieved.");
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else {
                return response.json().then(res => {
                    return Promise.reject(res.message);
                })
                
            }
        });
}

export const portfolio = {
    getPortfolioBest,
    getPortfolioSummary,
    getPortfolioWorst,
    editPortfolio
}