import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, Label, InputUnderlineDiv } from '../css/Form';
import { LinkContainer, SignUpSectionDiv, SignUpPageContainer, PasswordResetBackground, LogoContainer } from '../css/Div';
import { LinkText, PageTitle, SubText } from '../css/Text';
import { authentication } from '../services/authentication';
import { checkPassword } from '../helpers/helpers';
import { DefaultLogo } from '../css/Logo';
import logo from '../images/logo.png';
import { CustomButton } from '../css/Button';

import Particles from 'react-particles-js';
const SignUp = () => {

    // initialise variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [securityQ, setSecurityQ] = useState('');
    const [securityA, setSecurityA] = useState('');

    // navigate back to sign in
    const history = useHistory();
    const successfulSignUp = () => {
        const path = '/sign-up-success';
        history.push(path);
    };

    // handles user submitting the form
    const submitSignUpForm = (event) => {
        event.preventDefault();
        console.log("User submitted Sign Up Form!!!");
        if (checkPassword(pass, passConfirm)) {
            if (authentication.register(firstName, lastName, emailAdd, pass, securityQ, securityA)) {
                successfulSignUp();
            }
        }
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
                <a href="/"><DefaultLogo src={logo} alt="Stonk Ponk Logo" /></a>
                </LogoContainer>
                <SignUpForm onSubmit={(e) => submitSignUpForm(e)}>
                    <PageTitle>Get started right now, Join us!</PageTitle>
                    <SignUpSectionDiv row gap="2em">
                        <SignUpSectionDiv>
                            <Label htmlFor="firstName">First Name</Label>
                            <TextField type="text" id="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                            <InputUnderlineDiv className="underline"/>
                        </SignUpSectionDiv>
                        <SignUpSectionDiv>
                            <Label htmlFor="lastName">Last Name</Label>
                            <TextField type="text" id="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                            <InputUnderlineDiv className="underline"/>
                        </SignUpSectionDiv>
                    </SignUpSectionDiv>
                    <SignUpSectionDiv>
                        <Label htmlFor="emailAdd">Email</Label>
                        <TextField type="text" id="emailAdd" value={emailAdd} required onChange={(e) => setEmailAdd(e.target.value)} />
                        <InputUnderlineDiv className="underline"/>
                    </SignUpSectionDiv>
                    <SignUpSectionDiv>
                        <Label htmlFor="pass">Password</Label>
                        <TextField type="password" id="pass" value={pass} required onChange={(e) => setPass(e.target.value)} />
                        <InputUnderlineDiv className="underline"/>
                    </SignUpSectionDiv>
                    <SubText>Password must be 8 digits long and must include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.</SubText>
                    <SignUpSectionDiv>
                        <Label htmlFor="passConfirm">Confirm Password</Label>
                        <TextField type="password" id="passConfirm" value={passConfirm} required onChange={(e) => setPassConfirm(e.target.value)} />
                        <InputUnderlineDiv className="underline"/>
                    </SignUpSectionDiv>
                    <SignUpSectionDiv>
                        <Label htmlFor="securityQ">Security Question</Label>
                        <TextField type="text" id="securityQ" value={securityQ} required onChange={(e) => setSecurityQ(e.target.value)} />
                        <InputUnderlineDiv className="underline"/>
                    </SignUpSectionDiv>
                    <SignUpSectionDiv>
                        <Label htmlFor="securityA">Security Question Answer</Label>
                        <TextField type="text" id="securityA" value={securityA} required onChange={(e) => setSecurityA(e.target.value)} />
                        <InputUnderlineDiv className="underline"/>
                    </SignUpSectionDiv>
                    <CustomButton margin="2em 0 0 0" type="submit" value="Sign Up" aria-label="Button to submit the sign up form">Sign Up</CustomButton>
                    <LinkContainer>Already have an account?&nbsp;<LinkText href="/">Login.</LinkText></LinkContainer>
                </SignUpForm>
            </PasswordResetBackground>
        </SignUpPageContainer>
    );
};

export default SignUp;