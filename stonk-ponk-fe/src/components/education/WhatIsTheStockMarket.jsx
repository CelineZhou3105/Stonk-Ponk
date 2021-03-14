import React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumnLeftDiv, FlexRowDiv } from '../../css/Div';
import { PurpleItalicText } from '../../css/Text';
import { BackButton } from '../../css/Button';
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
            <main>
                <FlexColumnLeftDiv>
                    <FlexRowDiv style={{ width: "100%" }}>
                        <h1>Education</h1>
                        <BackButton aria-label="Navigate back to education page" onClick={navigateToEducation}>Back</BackButton>
                    </FlexRowDiv>
                    <h1>What is the stock market?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed augue lacus. Nulla malesuada pellentesque elit eget. Nulla porttitor massa id neque aliquam vestibulum morbi. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Dolor sit amet consectetur adipiscing elit duis tristique. Mattis pellentesque id nibh tortor id aliquet lectus. Et netus et malesuada fames ac turpis egestas integer. Et netus et malesuada fames ac. Massa sapien faucibus et molestie. Sit amet volutpat consequat mauris nunc congue. Id neque aliquam vestibulum morbi blandit cursus risus at. Phasellus faucibus scelerisque eleifend donec. Nisi scelerisque eu ultrices vitae auctor eu. Nisi lacus sed viverra tellus in hac habitasse platea. Aliquam vestibulum morbi blandit cursus risus at. Sapien faucibus et molestie ac feugiat sed lectus. Condimentum mattis pellentesque id nibh.</p>
                    <PurpleItalicText>So why would I invest?</PurpleItalicText>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed augue lacus. Nulla malesuada pellentesque elit eget. Nulla porttitor massa id neque aliquam vestibulum morbi. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Dolor sit amet consectetur adipiscing elit duis tristique. Mattis pellentesque id nibh tortor id aliquet lectus. Et netus et malesuada fames ac turpis egestas integer. Et netus et malesuada fames ac. Massa sapien faucibus et molestie. Sit amet volutpat consequat mauris nunc congue. Id neque aliquam vestibulum morbi blandit cursus risus at. Phasellus faucibus scelerisque eleifend donec. Nisi scelerisque eu ultrices vitae auctor eu. Nisi lacus sed viverra tellus in hac habitasse platea. Aliquam vestibulum morbi blandit cursus risus at. Sapien faucibus et molestie ac feugiat sed lectus. Condimentum mattis pellentesque id nibh.</p>
                </FlexColumnLeftDiv>
            </main>
        </div>
    );
};

export default WhatIsTheStockMarket;