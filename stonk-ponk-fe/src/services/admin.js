import { CheckAdminLink, SetForexPriorityLink } from "../api-links/constants";

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
                console.log("This user is an admin.");
                return Promise.resolve('Admin');
            } else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject();
            }
        });
}

const setForexApiPriority = async (alpha, yahoo) => {
    const priority = [{name: "yahoo_finance", priority: yahoo}, {name: "alphavantage", priority: alpha}];
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            priority: priority,
        }),
    };
    return await fetch(SetForexPriorityLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response;
            } else if (response.status === 403) {
                return Promise.reject("Expired token");
            } else {
                return Promise.reject(response);
            }
        }).catch(e => {
            return Promise.reject(e);
        })
}


export const admin = {
    checkAdmin,
    setForexApiPriority,
}

