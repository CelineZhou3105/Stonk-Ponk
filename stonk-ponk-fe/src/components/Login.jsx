import React, { useState } from 'react';
import Particles from 'react-particles-js';

import logo from '../images/logo.png';

// import { history } from '../helpers/history';
import { useHistory } from 'react-router-dom';

import { LinkContainer, LoginFormContainer, LoginPageContainer, LogoContainer, ParticleContainer } from '../css/Div';
import { GenericForm, InputUnderlineDiv, Label, TextField } from '../css/Form';
import { DefaultLogo } from '../css/Logo';
import { CompanyName, LinkText } from '../css/Text';

import { authentication } from '../services/authentication';

import { Redirect } from 'react-router-dom';
import { CustomButton } from '../css/Button';

function Login() {
    const history = useHistory();

    // Form values
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    if (localStorage.getItem("token")) {
        history.push('/market');
        <Redirect to={{ pathname: '/market' }} />
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
                    response => {
                        localStorage.setItem('token', response.token);
			history.push('/market');
                    },
                    response => {
			    alert("Error, couldn't login");
                    }
                )}>
                    <CompanyName>Stonk Ponk</CompanyName>
                    <Label htmlFor="username">Username</Label>
                    <TextField id="username" type="text" required onChange={(e) => { setEmail(e.target.value) }} />
                    <InputUnderlineDiv className="underline"></InputUnderlineDiv>

                    <Label htmlFor="password">Password</Label>
                    <TextField id="password" type="password" required onChange={(e) => { setPass(e.target.value) }} />
                    <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                    <LinkContainer right id="forgot-password">
                        <LinkText href="/forgot-password"> Forgot your password?</LinkText>
                    </LinkContainer>
                    <CustomButton margin="30px 0" type="submit" value="Login" aria-label="Button to login">Login</CustomButton>
                    <LinkContainer>Don't have an account?&nbsp; <LinkText href="/sign-up"> Sign up now!</LinkText></LinkContainer>
                </GenericForm>
            </LoginFormContainer>
        </LoginPageContainer>
    )
}

export default Login;
