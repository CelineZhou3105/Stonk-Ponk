import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, SignUpBtn, Label } from '../css/Form';
import { FlexColumnCenterDiv, FlexRowDiv } from '../css/Div';
import { BlueLinkText, GreyText, TitleItalicText } from '../css/Text';
import { EducationBox } from '../css/Button';
import Navigation from '../navigation/Navigation';

const Education = () => {
    // navigate back to sign in
    const history = useHistory();
    const navigateToSite = (site) => {
        const path = `/education/${site}`;
        history.push(path);
    };


    return (
        <div>
            <Navigation />
            <main>
                <h1>Education</h1>
                <FlexColumnCenterDiv>
                    <FlexRowDiv>
                        <EducationBox aria-label="Navigate to what is the stock market page" onClick={() => navigateToSite("what-is-the-stock-market")}>
                            What is the Stock Market?
                        </EducationBox>
                        <EducationBox aria-label="Navigate to interpreting the news page" onClick={() => navigateToSite("interpreting-the-news-page")}>
                            Interpreting the News
                        </EducationBox>
                        <EducationBox aria-label="Navigate to why invest page" onClick={() => navigateToSite("why-invest")}>
                            Why Invest?
                        </EducationBox>
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <EducationBox aria-label="Navigate to financial instruments 101 page" onClick={() => navigateToSite("financial-instruments-101")}>
                            Financial Instruments 101
                        </EducationBox>
                        <EducationBox aria-label="Navigate to statistics and graphs 101 page" onClick={() => navigateToSite("statistics-and-graphs-101")}>
                            Statistics and Graphs 101
                        </EducationBox>
                        <EducationBox aria-label="Navigate to passive vs active investing page" onClick={() => navigateToSite("passive-vs-active-investing")}>
                            Passive vs Active Investing
                        </EducationBox>
                    </FlexRowDiv>
                </FlexColumnCenterDiv>
            </main>
        </div>
    );
};

export default Education;