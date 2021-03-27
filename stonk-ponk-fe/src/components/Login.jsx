import React, { useState } from 'react';
import Particles from 'react-particles-js';

import logo from '../images/logo.png';

// import { history } from '../helpers/history';
import { useHistory } from 'react-router-dom';

import { LinkContainer, LoginFormContainer, LoginPageContainer, LogoContainer, ParticleContainer } from '../css/Div';
import { GenericForm, GenericSubmitButton, InputUnderlineDiv, LoginLabel, LoginTextField } from '../css/Form';
import { DefaultLogo } from '../css/Logo';
import { LinkText } from '../css/Text';

import { authentication } from '../services/authentication';

import { Redirect } from 'react-router-dom';

function Login() {
    const history = useHistory();

    // Form values
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    //const currentUser = authentication.currentUserValue;
    //console.log("hello" + currentUser);
    if (localStorage.getItem("token")) {
        console.log("tried to redirect to summary page...");
        history.push('/home');
        <Redirect to={{ pathname: '/home' }} />
    }

    return (
        <LoginPageContainer>
            <ParticleContainer login>
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
            </ParticleContainer>
            <LoginFormContainer>
                <LogoContainer>
                    <DefaultLogo src={logo} alt="Stonk Ponk Logo" />
                </LogoContainer>
                <GenericForm onSubmit={(e) => authentication.login(e, email, pass).then(
                    user => {
			            history.push('/home');
                    },
                    error => {
                        alert("Error, couldn't login");
                    }
                )}>
                    <h1>Stonk Ponk</h1>
                    <LoginLabel htmlFor="username">Username</LoginLabel>
                    <LoginTextField id="username" type="text" required onChange={(e) => { setEmail(e.target.value) }} />
                    <InputUnderlineDiv className="underline"></InputUnderlineDiv>

                    <LoginLabel htmlFor="password">Password</LoginLabel>
                    <LoginTextField id="password" type="password" required onChange={(e) => { setPass(e.target.value) }} />
                    <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                    <LinkContainer right id="forgot-password">
                        <LinkText href="/forgot-password"> Forgot your password?</LinkText>
                    </LinkContainer>
                    <GenericSubmitButton type="submit" value="Login" aria-label="Button to login"></GenericSubmitButton>
                    <LinkContainer>Don't have an account?&nbsp; <LinkText href="/sign-up"> Sign up now!</LinkText></LinkContainer>
                </GenericForm>
            </LoginFormContainer>
        </LoginPageContainer>
    )
}

export default Login;
