import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import { FlexColumnCenterDiv, LineDivider } from '../css/Div';
import { LoginButton } from '../css/Button';

const SignUpSuccess = () => {

    // navigate back to sign in
    const history = useHistory();
    const navigateToLogin = () => {
        const path = '/';
        history.push(path);
    };

    return (
        <div>
            <HeaderBar />
            <FlexColumnCenterDiv>
                <h1>Sign Up Successful!</h1>
                <LineDivider />
                <LoginButton onClick={navigateToLogin}>Log In</LoginButton>
            </FlexColumnCenterDiv>
        </div>
    );
};

export default SignUpSuccess;