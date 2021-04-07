import React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumnLeftDiv, FlexRowDiv, PageContainer } from '../../css/Div';
import { PurpleItalicText } from '../../css/Text';
import { CustomButton } from '../../css/Button';
import Navigation from '../Navigation';

const WhatIsTheStockMarket = () => {
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
                    <h1>What is the stock market?</h1>
                    <p>The stock market refers to the collection of markets and exchanges where regular activities of buying, selling, and issuance of shares of publicly-held companies take place. Such financial activities are conducted through institutionalized formal exchanges or over-the-counter (OTC) marketplaces which operate under a defined set of regulations. There can be multiple stock trading venues in a country or a region which allow transactions in stocks and other forms of securities.<br></br>
                    In a nutshell, stock markets provide a secure and regulated environment where market participants can transact in shares and other eligible financial instruments with confidence with zero- to low-operational risk. Operating under the defined rules as stated by the regulator, the stock markets act as primary markets and as secondary markets.</p>
                    <PurpleItalicText>So why would I invest?</PurpleItalicText>
                    <p>Stocks can be a valuable part of your investment portfolio. Owning stocks in different companies can help you build your savings, protect your money from inflation and taxes, and maximize income from your investments.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default WhatIsTheStockMarket;