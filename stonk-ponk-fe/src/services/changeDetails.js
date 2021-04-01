import { ChangeFirstNameLink, ChangeLastNameLink, ChangeEmailLink, ChangePasswordWithAuthLink } from '../api-links/constants';
import { authentication } from './authentication';

async function changeFirstName(firstN) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            firstName: firstN
        }),
    };
    await fetch(ChangeFirstNameLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response.json();
            } // if status code is not 200
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your first name!");
        })
        .catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(`${e.status} ${e.statusText}`);
                });
        });
}

async function changeLastName(lastN) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            lastName: lastN
        }),
    };
    await fetch(ChangeLastNameLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response.json();
            } // if status code is not 200
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your last name!");
        })
        .catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(`${e.status} ${e.statusText}`);
                });
        });
}

async function changeEmail(emailAdd) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            email: emailAdd
        }),
    };
    await fetch(ChangeEmailLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response.json();
            } // if status code is not 200
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your email! Please relog, logging out...");
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

async function changePassword(pass) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            password: pass
        }),
    };
    await fetch(ChangePasswordWithAuthLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return response.json();
            } // if status code is not 200
            return Promise.reject(response);
        })
        .then(() => {
            alert("You changed your password! Please relog, logging out...");
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

export const changeDetails = {
    changeFirstName,
    changeLastName,
    changeEmail,
    changePassword
};