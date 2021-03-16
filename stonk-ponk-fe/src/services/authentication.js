import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';

import { LoginLink, RegisterLink } from '../api-links/constants';

console.log("localStorage: " + localStorage.getItem('currentUser'));
const currentUserSubject = new BehaviorSubject('');

async function login(event, email, password) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password
        }),
    };
    return fetch(LoginLink, requestOptions)
        .then(response => handleResponse(response))
        .then(user => {
            // Store token 
            console.log("stored!");
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            console.log(currentUserSubject.value);
            return user;
        })
        .catch((error) => {
            // TODO - do something with the error
            console.log("Error in login, could not submit login details.");
        });
}

async function register(firstN, lastN, emailAdd, pass, securityQ, securityA) {
    const requestOptions = {
        method: 'POST',
        headers: {
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

    localStorage.removeItem('currentUser');
    console.log("I'm logging out.");
    currentUserSubject.next(null);

    // await fetch(`localhost:3000/logout/${token}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         token: token,
    //     })
    // }).then((response) => {
    //     if (response.ok) {

    //     }
    // }).catch((error) => {
    //     // TODO - do something about this error
    // });
}

export const authentication = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};