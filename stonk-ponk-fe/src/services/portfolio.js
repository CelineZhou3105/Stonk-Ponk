import { GetPortfolio } from '../api-links/constants';


async function getPortfolio(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorisation': token,
        },
    };
    await fetch(GetPortfolio, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("Successful login.");
                response.json().then(res => {
                    localStorage.setItem('token', res.token);
                    return Promise.resolve(res);
                })
            } else {
                response.json().then(res => {
                    return Promise.reject(res.message);
                })
                
            }
        });
}