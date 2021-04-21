import {
    ChangeEmailLink,
    ChangeNameLink,
    ChangePasswordWithAuthLink,
    ChangeProfilePictureLink,
    CheckAdminLink,
    GetUserDetailsLink,
    SetForexPriorityLink,
} from '../api-links/constants';

/**
 * getUser - makes the API call to get the user's details
 * @returns user's details like first name, last name, email
 */
const getUser = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    };
    return await fetch(GetUserDetailsLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject(response);
            }
        })
}

/**
 * changeName - Allows the user to change their first name and/or last name
 * @param {string} firstN - first name of the user
 * @param {string} lastN - last name of the user
 * @returns nothing if successful, a rejected promise if failed
 */
const changeName = async (firstN, lastN) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            first_name: firstN,
            last_name: lastN
        }),
    };
    return await fetch(ChangeNameLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response;
            } // if status code is not 200
            else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject(response);
            }
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

/**
 * changeEmail - Makes the API call to edit a user's email
 * @param {*} emailNew - new email of the user
 * @returns nothing if successful, a rejected Promise otherwise.
 */
const changeEmail = async (emailNew) => {

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_email: emailNew,
        }),
    };
    return await fetch(ChangeEmailLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200      
                return response;
            } // if status code is not 200
            else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject(response);
            }
        }).catch(e => {
            return Promise.reject(e)
        })
}

/**
 * changePassword - Makes the API call to edit the user's password 
 */
const changePassword = async (passwordNew, passwordOld) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_password: passwordNew,
            old_password: passwordOld,
        }),
    };
    return await fetch(ChangePasswordWithAuthLink, requestOptions)
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

const changeProfilePicture = async (image) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            image: image,
        }),
    };
    return await fetch(ChangeProfilePictureLink, requestOptions)
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

const checkAdmin = async() => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    };
    return await fetch(CheckAdminLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject(response);
            }
        })
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


export const settings = {
    getUser,
    changeName,
    changeEmail,
    changePassword,
    changeProfilePicture,
    checkAdmin,
    setForexApiPriority,
};