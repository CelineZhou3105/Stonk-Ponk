import { LoginLink, RegisterLink } from '../api-links/constants';

/**
 * login - Sends the API call to verify the user's credentials.
 * @param {Event} event - The event that triggers when the user clicks the login button
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns A resolved promise with the token if successful, OR a rejected promise if unsuccessful.
 */
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

/**
 * register - allows the user to register a new account
 * @param {*} firstN - first name of the user
 * @param {*} lastN - last name of the user
 * @param {*} emailAdd - email of the user
 * @param {*} pass - new password of the user
 * @param {*} securityQ - security question of the user
 * @param {*} securityA - security answer to the security question
 * @returns A resolved promise upon success, a rejected promise upon fail. 
 */
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
