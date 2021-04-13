import { ChangeNameLink, ChangeEmailLink, ChangePasswordWithAuthLink, GetUserDetailsLink } from '../api-links/constants';

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
            return Promise.reject(response);
        })
}

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
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your name!");
        })
        .catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(`${e.status} ${e.statusText}`);
                });
        });
}

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
            return Promise.reject(response);
        })
}

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
            } // if status code is not 200
            return Promise.reject(response);
        })
}


export const settings = {
    getUser,
    changeName,
    changeEmail,
    changePassword,
};