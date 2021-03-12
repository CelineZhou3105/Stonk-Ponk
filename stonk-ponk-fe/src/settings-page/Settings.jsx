import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, SignUpBtn, Label } from '../css/Form';
import { FlexRowDiv, SignUpItemDiv, LineDivider } from '../css/Div';
import { BlueLinkText, GreyText, TitleItalicText } from '../css/Text';
import HeaderBar from '../navigation/HeaderBar';

const Settings = () => {

    // navigate back to sign in
    const history = useHistory();
    const successfulSignUp = () => {
        const path = '/sign-up-success';
        history.push(path);
    };

    return (
        <div>
        </div>
    );
};

export default Settings;