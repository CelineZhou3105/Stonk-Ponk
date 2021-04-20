import React, { useState } from 'react';
import Particles from 'react-particles-js';
import { Redirect, useHistory } from 'react-router-dom';

import { authentication } from '../services/authentication';
import logo from '../images/logo.png';
import { 
    LinkContainer,
    LoginFormContainer,
    LoginPageContainer,
    LogoContainer,
    ParticleContainer
} from '../css/Div';
import { 
    GenericForm,
    InputUnderlineDiv,
    Label,
    TextField
} from '../css/Form';
import { DefaultLogo } from '../css/Logo';
import { CompanyName, LinkText } from '../css/Text';
import { CustomButton } from '../css/Button';

import Alert from '@material-ui/lab/Alert';

/**
 * Login Page - Contains the form users enter their login credentials into. 
 */
function Login() {
    const history = useHistory();

    // Form values
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);

    // Redirect to market upon successful login & token storage
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
                {error &&
                    <Alert variant="filled" severity="error">
                        Could not log in. Please try again.
                    </Alert>
                }
                <LogoContainer>
                    <DefaultLogo src={logo} alt="Stonk Ponk Logo" />
                </LogoContainer>
                <GenericForm onSubmit={(e) => authentication.login(e, email, pass)
                    .then(response => {
                        localStorage.setItem('token', response.token);
			            history.push('/market');
                    }).catch(e => {
                        setError(true);
                    })
                }>
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
