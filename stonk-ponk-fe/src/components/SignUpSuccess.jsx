import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import { FlexColumnCenterDiv, LineDivider } from '../css/Div';
import { CustomButton } from '../css/Button';

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
                <CustomButton onClick={navigateToLogin}>Log In</CustomButton>
            </FlexColumnCenterDiv>
        </div>
    );
};

export default SignUpSuccess;