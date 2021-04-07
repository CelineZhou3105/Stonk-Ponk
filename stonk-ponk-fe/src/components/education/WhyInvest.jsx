import React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { CustomButton } from '../../css/Button';
import Navigation from '../Navigation';

const WhyInvest = () => {
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
                    <h1>Why Invest?</h1>
                    <p>In order to build your wealth, you will want to invest your money. Investing allows you to put your money in vehicles that have the potential to earn strong rates of return.<br></br>
                    If you don’t invest, you are missing out on opportunities to increase your financial worth. Of course, you have the potential to lose your money in investments, but if you invest wisely, the potential to gain money is higher than if you never invest.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default WhyInvest;