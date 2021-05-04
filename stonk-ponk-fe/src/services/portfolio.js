import {
    EditPortfolio,
    GetPortfolioSummary,
    GetPortfolioBestStocks,
    GetPortfolioWorstStocks,
    GetPortfolioDetails,
    GetPortfolioHealth
} from '../api-links/constants';


/**
 * getPortfolioSummary - sends a request to get the user's portfolio summary (pie chart, value, percentage change)
 * @returns - An array of stocks owned by the user, the cumulative value of their portfolio, percentage change of the portfolio
 */
export async function getPortfolioSummary() {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };
    return await fetch(GetPortfolioSummary + '?n=5', requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your portfolio summary. Please refresh");
            }
        });
}

/**
 * getPortfolioDetails - sends a request to get the user's portfolio stocks
 * @returns - returns more details on the stocks of the portfolio (price, purchase date, units owned)
 */
export async function getPortfolioDetails() {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };
    return await fetch(GetPortfolioDetails, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your portfolio details. Please refresh");
            }
        });
}

/**
 * editPortfolio - sends a request to save the user's portfolio new state
 * @param {Array} data - list of stocks in the portfolio 
 * @returns - nothing.
 */
export async function editPortfolio(data) {
    const token = localStorage.getItem('token');

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
                return Promise.resolve();
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else { // Usually this means 400
                try {
                    return response.json()
                    .then(res => {
                        if (res.message === 'Stock Price Not Found For This Day') {
                            return Promise.reject(`${res.message}.`);
                        } else {
                            return Promise.reject(`${res.message}. Price must be within range $${res.price_range.low.toFixed(2)} - $${res.price_range.high.toFixed(2)}`);
                        }
                    })
                } catch (e) {
                    return Promise.reject("An error occured while editing your portfolio. Please retry.");
                }
            }
        });
}

/**
 * getPortfolioBest - sends a request to get the user's best stocks
 * @param {number} num_stocks - the number of stocks to return
 * @returns - an array of the user's best performing stocks (by profit)
 */
export async function getPortfolioBest(num_stocks) {
    const token = localStorage.getItem('token');

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
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your best stocks. Please refresh");
            }
        });
}

/**
 * getPortfolioWorst - sends a request to get the user's worst stocks
 * @param {number} num_stocks - the number of stocks to return
 * @returns - An array of the user's worst performing stocks (by loss)
 */
export async function getPortfolioWorst(num_stocks) {
    const token = localStorage.getItem('token');

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
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your worst stocks. Please refresh.");
            }
        });
}

/**
 * getPortfolioHealth - gets the user's portfolio health 
 * @returns - Returns a user's beta score, profitability score, volatility score
 */
export async function getPortfolioHealth() {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };
    return await fetch(GetPortfolioHealth, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json().then(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your portfolio health. Please refresh.");
            }
        });
}

export const portfolio = {
    getPortfolioBest,
    getPortfolioDetails,
    getPortfolioSummary,
    getPortfolioWorst,
    getPortfolioHealth,
    editPortfolio
}
