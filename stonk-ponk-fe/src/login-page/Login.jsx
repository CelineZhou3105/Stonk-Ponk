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
<<<<<<< HEAD
        <div className="container">
            <div className="particle-container">
                <Particles
=======
        <LoginPageContainer>
            <ParticleContainer login>
                <Particles 
>>>>>>> 3143210165070260d92cc96970f7e894fc10299c
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
<<<<<<< HEAD
            </div>
            <div className="login-form">
                <div className="stonk-ponk-logo">
                    <img id="logo" src={logo} alt="" />
                </div>
                <div className="title">
                    <h1>Stonk Ponk</h1>
                </div>
                <form action="/home">
                    <div class="label-container"><label for="username">Username</label></div>
                    <input id="username" type="text" required></input>
                    <div class="underline"></div><br></br>

                    <div class="label-container"><label for="password">Password</label></div>
                    <input id="password" type="password" required></input>
                    <div class="underline"></div><br></br>
                    <p id="forgot-password">
                        <a className="link" href="#"> Forgot your password?</a>
                    </p>
                    <input id="submit-button" type="submit" value="Login" />
                </form>
                <hr></hr>
                <p>Don't have an account? <NavLink className="link" to="/sign-up">Sign up now!</NavLink></p>

            </div>
        </div>
=======
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
>>>>>>> 3143210165070260d92cc96970f7e894fc10299c
    )
}

export default Login;