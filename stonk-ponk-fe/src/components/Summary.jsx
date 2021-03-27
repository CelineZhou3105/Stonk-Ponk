import React from 'react';
import Navigation from './Navigation';
import PortfolioSummary from './PortfolioSummary';

function Summary() {

    // const user = authentication.currentUserValue;
    return (
        <div>
            <Navigation />
            <h1>Summary</h1>
            <PortfolioSummary />
        </div>
    )
}

export default Summary;