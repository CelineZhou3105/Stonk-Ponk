import { 
    CheckAdminLink,
    GetForexPriorityLink,
    GetNewsPriorityLink,
    GetStockPriorityLink,
    SetForexPriorityLink,
    SetNewsPriorityLink,
    SetStockPriorityLink 
} from "../api-links/constants";

/**
 * checkAdmin - Checks if the logged in user is an admin
 */
 async function checkAdmin() {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    return await fetch(CheckAdminLink, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject('Could not retrieve if this user is an admin.');
            }
        });
}

const getForexApiPriority = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    };
    return await fetch(GetForexPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response.json(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while retrieving the forex api priority. Please refresh.');
            }
        })
}

const setForexApiPriority = async (alpha, yahoo) => {
    const priority = [{name: "yahoo_finance", priority: yahoo}, {name: "alphavantage", priority: alpha}];
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_priorities: priority,
        }),
    };
    return await fetch(SetForexPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response;
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while setting the forex api priority. Please refresh.');
            }
        })
}

const getNewsPriority = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    };
    return await fetch(GetNewsPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response.json(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while getting the news api priority. Please refresh.');
            }
        })
}

const setNewsPriority = async (google, yahoo) => {
    const priority = [{name: "yahoo_fin_news", priority: yahoo}, {name: "google_news", priority: google}];
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_priorities: priority,
        }),
    };
    return await fetch(SetNewsPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response;
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while setting the news api priority. Please refresh.');
            }
        })
}

const getStockPriority = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    };
    return await fetch(GetStockPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response.json(res => {
                    return Promise.resolve(res);
                })
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while getting the stock api priority. Please refresh.');
            }
        })
}

const setStockPriority = async (yahoo, alpha) => {
    const priority = [{name: "yahoo_fin", priority: yahoo}, {name: "alphavantage", priority: alpha}];
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_priorities: priority,
        }),
    };
    return await fetch(SetStockPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response;
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject('Something went wrong while setting the stock api priority. Please refresh.');
            }
        })
}


export const admin = {
    checkAdmin,
    getForexApiPriority,
    setForexApiPriority,
    getNewsPriority,
    setNewsPriority,
    getStockPriority,
    setStockPriority,
}

