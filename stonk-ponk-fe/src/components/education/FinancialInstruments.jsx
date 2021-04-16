import React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { CustomButton } from '../../css/Button';
import Navigation from '../Navigation';

const FinancialInstruments = () => {
    // navigate back to sign in
    const history = useHistory();
    const navigateToEducation = (site) => {
        const path = `/education`;
        history.push(path);
    };


    return (
        <div>
            <Navigation />
            <PageContainer>
                <FlexColumnLeftDiv>
                    <FlexRowDiv style={{ width: "100%" }}>
                        <h1>Education</h1>
                        <CustomButton backgroundColor="#d6d6d6" color="#000000" hoverColor="#c2c2c2" aria-label="Navigate back to education page" onClick={navigateToEducation}>Back</CustomButton>
                    </FlexRowDiv>
                    <h1>Financial Instruments 101</h1>
                    <p>Financial instruments are assets that can be traded, or they can also be seen as packages of capital that may be traded. Most types of financial instruments provide efficient flow and transfer of capital all throughout the world's investors. These assets can be cash, a contractual right to deliver or receive cash or another type of financial instrument, or evidence of one's ownership of an entity.</p>
                    <h2>Types of Financial Instruments</h2>
                    <h3>Cash Instruments</h3>
                    <p>The values of cash instruments are directly influenced and determined by the markets. These can be securities that are easily transferable.<br></br>
                    Cash instruments may also be deposits and loans agreed upon by borrowers and lenders.</p>
                    <h3> Derivative Instruments</h3>
                    <p>The value and characteristics of derivative instruments are based on the vehicle’s underlying components, such as assets, interest rates, or indices.</p>
                    <p>There can be over-the-counter (OTC) derivatives or exchange-traded derivatives. OTC is a market or process whereby securities–that are not listed on formal exchanges–are priced and traded.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default FinancialInstruments;