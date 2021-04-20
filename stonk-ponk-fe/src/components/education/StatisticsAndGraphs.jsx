import React from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from '../Navigation';

import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { CustomButton } from '../../css/Button';
import { PageTitle } from '../../css/Text';

const StatisticsAndGraphs = () => {
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
                        <PageTitle>Education</PageTitle>
                        <CustomButton backgroundColor="#d6d6d6" color="#000000" hoverColor="#c2c2c2" aria-label="Navigate back to education page" onClick={navigateToEducation}>Back</CustomButton>
                    </FlexRowDiv>
                    <h1>Statistics and Graphs</h1>
                    <p>Technical traders use a variety of stock charts to analyze market data in order to pinpoint optimum entry and exit points for their trades.</p>
                    <p>For each secuirty on StonkPonk, you will have access to statistics such as the current Bid/Ask Rates, 52 week range, open and closing prices. All indicators have been given stock tips to help you determine how to make trades based on the statistic</p>
                    <p>Each security page also displays the security's performance over the last week, month, six months and year. This will enable you to see the performance of the stock before making a trade.</p> 
                    <p>An active investor may seek to make trade decisions based off a shorter horizon such as the last week or month, whereas a passive investor would also consider the last six months and last year tabs (perhaps even more) to make their trade decision.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default StatisticsAndGraphs;