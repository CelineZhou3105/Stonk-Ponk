import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, SignUpBtn, Label } from '../css/Form';
import { FlexColumnCenterDiv, FlexRowDiv } from '../css/Div';
import { BlueLinkText, GreyText, TitleItalicText } from '../css/Text';
import { BackButton } from '../css/Button';
import Navigation from '../navigation/Navigation';

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
            <main>
                <FlexRowDiv>
                    <h1>Education</h1>
                    <BackButton aria-label="Navigate back to education page" onClick={navigateToEducation}>Back</BackButton>
                </FlexRowDiv>
                <FlexColumnCenterDiv>
                    <FlexRowDiv>
                    </FlexRowDiv>
                </FlexColumnCenterDiv>
            </main>
        </div>
    );
};

export default WhatIsTheStockMarket;