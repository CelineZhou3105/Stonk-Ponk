import React, { useState } from 'react';
import Particles from 'react-particles-js';

import { useHistory } from 'react-router-dom';

import logo from '../navigation/logo.png';

import { LinkContainer, LoginFormContainer, LoginPageContainer, LogoContainer, ParticleContainer } from '../css/Div';
import { GenericForm, GenericSubmitButton, InputUnderlineDiv, Label, TextField } from '../css/Form';
import { DefaultLogo } from '../css/Logo';
import { LinkText } from '../css/Text';

function Login() {

    // Form values
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();
    function redirectToHome() {
        history.push("/home");
    }

    const submitLoginForm = async (event) => {
        event.preventDefault();
        await fetch("https://stonkponk.com/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
                password: pass,
            }),
        }).then((response) => {
            if (response.ok) {
                redirectToHome();
            }
        }).catch((error) => {
            // TODO - do something with the error
        });

        // TODO - remove this because we want to only redirect upon login success
        redirectToHome();
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
                    <DefaultLogo src={logo} alt="Stonk Ponk Logo"/>
                </LogoContainer>
                <GenericForm onSubmit={(e) => submitLoginForm(e)}>
                    <h1>Stonk Ponk</h1>
                    <Label htmlFor="username">Username</Label>
                    <TextField id="username" type="text" required onChange={(e) => {setEmail(e.target.value)}}/>
                    <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                    
                    <Label htmlFor="password">Password</Label>
                    <TextField id="password" type="password" required onChange={(e) => {setPass(e.target.value)}}/>
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