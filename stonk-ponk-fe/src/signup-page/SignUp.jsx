import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm, TextField, SignUpBtn, Label } from '../css/Form';
import { FlexRowDiv, SignUpItemDiv, LineDivider } from '../css/Div';
import { BlueLinkText, GreyText, TitleItalicText } from '../css/Text';
import HeaderBar from '../navigation/HeaderBar';

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
        if (pass.length <= 8) {
            alert("Password must be longer than 8 characters/digits.");
            return;
        }
        if (pass.match(/[A-Z]/) === null) {
            alert("Password must include at least 1 upper case letter.");
            return;
        }
        if (pass.match(/[a-z]/) === null) {
            alert("Password must include at least 1 lower case letter.");
            return;
        }
        if (pass.match(/\d/) === null) {
            alert("Password must include at least 1 number.");
            return;
        }
        if (pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/) === null) {
            alert("Password must include at least 1 special character.");
            return;
        }
        if (pass !== passConfirm) {
            alert("Passwords does not match! Re-enter your password.");
            return;
        }
        successfulSignUp();
    };

    return (
        <div>
            <HeaderBar />
            <main>
                <SignUpForm onSubmit={(e) => submitSignUpForm(e)}>
                    <TitleItalicText>Get started right now, Join us!</TitleItalicText>
                    <FlexRowDiv>
                        <SignUpItemDiv>
                            <Label htmlFor="firstName">First Name</Label>
                            <TextField type="text" id="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                        </SignUpItemDiv>
                        <SignUpItemDiv>
                            <Label htmlFor="lastName">Last Name</Label>
                            <TextField type="text" id="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                        </SignUpItemDiv>
                    </FlexRowDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="emailAdd">Email</Label>
                        <TextField type="text" id="emailAdd" value={emailAdd} required onChange={(e) => setEmailAdd(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="pass">Password</Label>
                        <TextField type="password" id="pass" value={pass} required onChange={(e) => setPass(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="passConfirm">Confirm Password</Label>
                        <TextField type="password" id="passConfirm" value={passConfirm} required onChange={(e) => setPassConfirm(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="securityQ">Security Question</Label>
                        <TextField type="text" id="securityQ" value={securityQ} required onChange={(e) => setSecurityQ(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpItemDiv>
                        <Label htmlFor="securityA">Security Question Answer</Label>
                        <TextField type="text" id="securityA" value={securityA} required onChange={(e) => setSecurityA(e.target.value)} />
                    </SignUpItemDiv>
                    <SignUpBtn type="submit" value="Sign Up" aria-label="Button to submit the sign up form" />
                    <LineDivider />
                    <GreyText>Already have an account? <a href="/"><BlueLinkText>Login.</BlueLinkText></a></GreyText>
                </SignUpForm>
            </main>
        </div>
    );
};

export default SignUp;