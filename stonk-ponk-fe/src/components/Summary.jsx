import React from 'react';
import Navigation from './Navigation';

import { authentication } from '../services/authentication';

function Summary() {

    // const user = authentication.currentUserValue;
    return (
        <div>
            <Navigation />
            <h1>Summary Page</h1>
            <h1>Congratulations! You've signed in.</h1>
        </div>
    )
}

export default Summary;