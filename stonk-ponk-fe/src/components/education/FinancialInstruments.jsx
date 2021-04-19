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
                    <h1>Shares & Taxes</h1>
                    <p>In Australia, when investors sell shares and other listed securities for a price higher than they paid, the profit or capital gain may be subject to a capital gains tax. Capital gains taxes are common globally, but Australia’s implementation is considered one of the world’s most complex, and the nuance in this regulation can have significant implications at tax time. As a result, investors need to understand how their trading activity during the year will impact their capital gains position in their tax return at the end of the financial year.
                       The amount of tax an investor ultimately pays on their capital gains in Australia depends on a number of factors, which are discussed in this article. This includes whether they are holding shares as an investor or trading shares as business, how long they have owned the shares, their marginal tax rate, and whether they also made capital losses. Broadly, investors need to include all investment income in their tax return. Tax on investment income is set at the investor’s marginal tax rate.</p>
                    
                    <h3>Capital gains</h3>
                    <p>If an investor sells an investment for more than the cost to acquire it, they have realised a capital gain. This will need to be reported in their annual income tax return. Although it’s referred to as capital gains tax (CGT), this is actually part of the income tax regime and not a separate tax.</p>

                    <h3>Capital Losses</h3>

                    <p>An investor makes a capital loss on shares if they sell them for less than they paid for them. As noted above, it is important to be aware that a capital loss can be used to reduce the tax on a capital gain in the same income year. In some cases this loss can be carried forward to offset future capital gains.</p>
                </FlexColumnLeftDiv>
            </PageContainer>
        </div>
    );
};

export default FinancialInstruments;