import { 
    EditPortfolio, 
    GetPortfolioSummary, 
    GetPortfolioBestStocks, 
    GetPortfolioWorstStocks, 
    GetPortfolioDetails
} from '../api-links/constants';

const token = localStorage.getItem('token');

/**
 * getPortfolioSummary - sends a request to get the user's portfolio summary (pie chart, value, percentage change)
 * @returns - An array of stocks owned by the user, the cumulative value of their portfolio, percentage change of the portfolio
 */
export async function getPortfolioSummary() {
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
                console.log("Successfully got portfolio");
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
                console.log("Successfully retrieved portfolio stocks.");
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
                console.log("Successful edit. Response: ", response);
                return Promise.resolve();
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while editing your portfolio. Please retry.");
            }
        });
}

/**
 * getPortfolioBest - sends a request to get the user's best stocks
 * @param {number} num_stocks - the number of stocks to return
 * @returns - an array of the user's best performing stocks (by profit)
 */
export async function getPortfolioBest(num_stocks) {
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
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject("An error occured while getting your worst stocks. Please refresh.");
            }
        });
}

export const portfolio = {
    getPortfolioBest,
    getPortfolioDetails,
    getPortfolioSummary,
    getPortfolioWorst,
    editPortfolio
}