import React from 'react';
import Navigation from './Navigation';

import { authentication } from '../services/authentication';

function Summary() {

    const user = authentication.currentUserValue;
    return (
        <div>
            <Navigation />
            <h1>I am a summary page.</h1>
            <h1>Congratulations {user.firstName}! You've signed in.</h1>
        </div>
    )
}

export default Summary;