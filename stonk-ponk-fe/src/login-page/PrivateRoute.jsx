import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authentication } from '../services/authentication';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const user = authentication.currentUserValue;
        if (!user) {
            // not logged in so redirect to login page with the return url
            console.log("Redirecting to login page. Summary page is a private route!");
            return <Redirect to={{ pathname: '/' }} />
        }

        // Successful login - return component
        return <Component {...props} />
    }} />
)