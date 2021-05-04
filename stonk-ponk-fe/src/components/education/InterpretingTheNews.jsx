import React from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from '../Navigation';

import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { PageTitle, PurpleItalicText } from '../../css/Text';
import { CustomButton } from '../../css/Button';

const InterpretingTheNews = () => {
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
                    <h1>Interpreting the News</h1>
                    <p>Stock prices tick up and down constantly due to fluctuations in supply and demand. If more people want to buy a stock, its market price will increase. If more people are trying to sell a stock, its price will fall. The relationship between supply and demand is highly sensitive to the news of the moment. Nonetheless, chasing the news is not a good stock-picking strategy for the individual investor. In most cases, professional traders react in anticipation of an event, not when the event is reported.</p>
                    <PurpleItalicText>So why is the news important?</PurpleItalicText>
                    <p>Negative news will normally cause people to sell stocks. A bad earnings report, a lapse in corporate governance, big-picture economic and political uncertainty, and unfortunate occurrences all translate to selling pressure and a decrease in the prices of many if not most stocks.</p>
                    <p>Positive news will normally cause individuals to buy stocks. Good earnings reports, an announcement of a new product, a corporate acquisition, and positive economic indicators all translate into buying pressure and an increase in stock prices.</p>
                    <p>Bad news for some stocks is good news for others.<br></br> For example, news that a hurricane has made landfall may cause a decline in utility stocks, in anticipation of costly emergency responses and repairs. Depending on the severity of the storm, insurance stocks will take a hit on the news.
                    <br></br>Meanwhile, the stocks of home improvement retailers will rise in anticipation of higher sales over the months to come.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default InterpretingTheNews;