import { ChangeNameLink, ChangeLoginCredentialsLink, GetUserDetailsLink } from '../api-links/constants';
import { authentication } from './authentication';

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

async function changeName(firstN, lastN) {
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

async function changeLoginCredentials(emailNew, passwordNew, passwordOld) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            new_email: emailNew,
            new_password: passwordNew,
            old_password: passwordOld,
        }),
    };
    return await fetch(ChangeLoginCredentialsLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response;
            } // if status code is not 200
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your login credentials! Please relog, logging out...");
            setTimeout(() => {
                authentication.logout();
            }, 3000);
        })
        .catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(`${e.status} ${e.statusText}`);
                });
        });
}


export const settings = {
    getUser,
    changeName,
    changeLoginCredentials,
};