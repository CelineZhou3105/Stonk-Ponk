import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, SignUpBtn, Label } from '../css/Form';
import { FlexRowDiv, SignUpItemDiv, LineDivider } from '../css/Div';
import { Header } from '../css/Header';
import { HeaderLogo } from '../css/Logo';
import { BlueLinkText, GreyText, TitleItalicText } from '../css/Text';
import logo from '../navigation/logo.png';

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

    const submitSignUpForm = (event) => {
        console.log("User submitted Sign Up Form!!!");
    };

    return (
        <div>
            <Header>
                <HeaderLogo src={logo} alt="Stonk Ponk Logo" />
            </Header>
            <SignUpForm onSubmit={(e) => submitSignUpForm(e)}>
                <TitleItalicText>Get started right now, Join us!</TitleItalicText>
                <FlexRowDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="firstName">First Name</Label>
                        <TextField type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="lastName">Last Name</Label>
                        <TextField type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </SignUpItemDiv>
                </FlexRowDiv>
                <SignUpItemDiv>
                    <Label htmlFor="emailAdd">Email</Label>
                    <TextField type="text" id="emailAdd" value={emailAdd} onChange={(e) => setEmailAdd(e.target.value)} />
                </SignUpItemDiv>
                <SignUpItemDiv>
                    <Label htmlFor="pass">Password</Label>
                    <TextField type="password" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
                </SignUpItemDiv>
                <SignUpItemDiv>
                    <Label htmlFor="passConfirm">Confirm Password</Label>
                    <TextField type="password" id="passConfirm" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} />
                </SignUpItemDiv>
                <SignUpItemDiv>
                    <Label htmlFor="securityQ">Security Question</Label>
                    <TextField type="text" id="securityQ" value={securityQ} onChange={(e) => setSecurityQ(e.target.value)} />
                </SignUpItemDiv>
                <SignUpItemDiv>
                    <Label htmlFor="securityA">Security Question Answer</Label>
                    <TextField type="text" id="securityA" value={securityA} onChange={(e) => setSecurityA(e.target.value)} />
                </SignUpItemDiv>
                <SignUpBtn type="submit" value="Sign Up" aria-label="Button to submit the sign up form" />
                <LineDivider />
                <GreyText>Already have an account? <a href="/"><BlueLinkText>Login.</BlueLinkText></a></GreyText>
            </SignUpForm>
        </div>
    );
};

export default SignUp;