import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';

console.log("localStorage: " + localStorage.getItem('currentUser'));
const currentUserSubject = new BehaviorSubject('');

async function login (event, email, password) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password,
        }),
    };
    return fetch("localhost:8000/api/account/login", requestOptions)
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
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};