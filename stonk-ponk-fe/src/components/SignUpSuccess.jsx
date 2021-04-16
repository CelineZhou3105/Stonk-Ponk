import React from 'react';
import { useHistory } from 'react-router-dom';
import { PasswordResetBackground, LogoContainer, SignUpPageContainer } from '../css/Div';
import { CustomButton } from '../css/Button';
import { DefaultLogo } from '../css/Logo';
import logo from '../images/logo.png';
import Particles from 'react-particles-js';
import { PageTitle } from '../css/Text';

const SignUpSuccess = () => {

    // navigate back to sign in
    const history = useHistory();
    const navigateToLogin = () => {
        const path = '/';
        history.push(path);
    };

    return (
        <SignUpPageContainer>
            <div id="particles-js">
                <Particles 
                    width={"100%"}
                    height={"100%"}
                    params={{
                        "particles": {
                            "number": {
                                "value": 70
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }}
                />
            </div>
            <PasswordResetBackground>
                <LogoContainer>
                    <DefaultLogo src={logo} alt="Stonk Ponk Logo" />
                </LogoContainer>
                <PageTitle>Sign Up Successful!</PageTitle>
                <CustomButton onClick={navigateToLogin}>Back to Login</CustomButton>
            </PasswordResetBackground>
        </SignUpPageContainer>
    );
};

export default SignUpSuccess;