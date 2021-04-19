import { LoginLink, RegisterLink } from '../api-links/constants';

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
    return await fetch(LoginLink, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Successful login.");
                return response.json().then(res => {
                    localStorage.setItem('token', res.token);
                    return Promise.resolve(res);
                })
            } else {
                return Promise.reject();
                //return Promise.reject(response.json());
            }
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
    return await fetch(RegisterLink, requestOptions)
        .then(response => {
            if (response.ok) { // if status code is 200
                return Promise.resolve(response);
            } // if status code is not 200
            return Promise.reject(response);
        })
}
export const authentication = {
    login,
    register,
};
