import { CheckAdminLink } from "../api-links/constants";

/**
 * checkAdmin - Checks if the logged in user is an admin
 */
 async function checkAdmin() {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    return await fetch(CheckAdminLink, requestOptions)
        .then(response => {
            if (response.status === 200) {
                console.log("This user is an admin.");
                return Promise.resolve('Admin');
            } else if (response.status === 403) {
                return Promise.reject('Expired token');
            } else {
                return Promise.reject();
            }
        });
}


export const admin = {
    checkAdmin,
}

