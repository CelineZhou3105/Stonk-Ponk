import React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { CustomButton } from '../../css/Button';
import Navigation from '../Navigation';

const PassiveVsActive = () => {
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
                    <h1>Passive vs Active Investing</h1>
                    <h3>Active Investing</h3>
                    <p>Active investing, as its name implies, takes a hands-on approach and requires that someone act in the role of a portfolio manager. The goal of active money management is to beat the stock market’s average returns and take full advantage of short-term price fluctuations. It involves a much deeper analysis and the expertise to know when to pivot into or out of a particular stock, bond, or any asset. A portfolio manager usually oversees a team of analysts who look at qualitative and quantitative factors, then gaze into their crystal balls to try to determine where and when that price will change.<br></br>
                    Active investing requires confidence that whoever is investing the portfolio will know exactly the right time to buy or sell. Successful active investment management requires being right more often than wrong.</p>

                    <h3>Passive Investing</h3>
                    <p>If you’re a passive investor, you invest for the long haul. Passive investors limit the amount of buying and selling within their portfolios, making this a very cost-effective way to invest. The strategy requires a buy-and-hold mentality. That means resisting the temptation to react or anticipate the stock market’s every next move.</p>
                    
                    <h3> What is the Difference?</h3>
                    <p>Active investors react to changes in market conditions and buy or sell based on latest results or news about a company. Active investors often invest in individual stocks and often seek to profit from the volatility in price of low cap stocks.</p>
                    <p>Passive investors invest based on their expectation of long term growth. Passive investors often invest in more established stocks which have a mid-large market cap. They seek to diversify their investments by investing in ETF's covering an industry or index.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default PassiveVsActive;