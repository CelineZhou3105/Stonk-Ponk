// import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';

import { LoginLink, LogoutLink, RegisterLink } from '../api-links/constants';

// console.log("localStorage: " + localStorage.getItem('currentUser'));
// const currentUserSubject = new BehaviorSubject('');

async function login(event, email, password) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    };
    await fetch(LoginLink, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Successful login.");
                response.json().then(res => {
                    localStorage.setItem('token', res.token);
                    return Promise.resolve(res);
                })
            }
        })
        .catch((error) => {
            alert("Error: Couldn't initiate login fetch: ", error);
        });
}

async function register(firstN, lastN, emailAdd, pass, securityQ, securityA) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstN,
            lastName: lastN,
            email: emailAdd,
            password: pass,
            securityQuestion: securityQ,
            securityAnswer: securityA
        })
    };
    await fetch(RegisterLink, requestOptions)
        .then(response => response.json)
        .then((response) => {
            if (response.ok) { // if status code is 200
                return true;
            } // if status code is not 200
            return Promise.reject(response.json());
        })
        .catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(e.error);
                });
        });
}

async function logout(event) {
    event.preventDefault();

    // localStorage.removeItem('currentUser');
    // currentUserSubject.next(null);
    console.log("Initiating logout request...");
    const token = localStorage.getItem('token');

    await fetch(LogoutLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        })
    }).then((response) => {
        if (response.status === 200) {
            // Logged out successfully
            console.log("Successfully logged out!");
            localStorage.remove('token');
        } else {
            alert("An error occured.");
        }
    }).catch((error) => {
        alert("Error: Couldn't initiate logout fetch: ", error);
    });
}

export const authentication = {
    login,
    register,
    logout,
    // currentUser: currentUserSubject.asObservable(),
    // get currentUserValue() { return currentUserSubject.value }
};
