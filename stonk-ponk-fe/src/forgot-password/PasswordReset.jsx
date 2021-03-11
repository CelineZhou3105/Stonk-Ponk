import React, { useState } from 'react';
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom';

import logo from '../navigation/logo.png';

import { FormContainer, LogoContainer, ParticleContainer,  PasswordResetBackground, PasswordResetPageContainer} from '../css/Div';
import { GenericForm, GenericSubmitButton, Label, TextField } from '../css/Form';
import { PasswordResetLogo } from '../css/Logo';

function PasswordReset() {

    // Form values
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    // Visibility of fields
    const [emailFormVisible, setEmailFormVisible] = useState(true);
    const [securityQuestionVisible, setSecurityQuestionVisible] = useState(false);
    const [newPasswordFormVisible, setNewPasswordFormVisible] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    // Navigate to log in form
    const history = useHistory();
    const redirectToLogin = () => {
        const path = '/';
        history.push(path);
    };

    // Submit request for security question associated with account
    let securityQuestion;
    const submitPasswordForm = async (event) => {
        event.preventDefault();
        await fetch('https://stonkponk.com/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
            }),
        }).then((response) => {
            if (response.ok) {
                setEmailFormVisible(false);
                setSecurityQuestionVisible(true);
                // TODO - set the security question based on the response given.    
            }
        }).catch((error) => {
            console.log("this didn't work!!");
        })
    }

    // Submit security question answer
    const submitSecurityQuestion = async (event) => {
        event.preventDefault();
        await fetch("https://stonkponk.com/security-question", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                securityQuestion: securityQuestion,
                answer: answer,
            })
        }).then((response) => {
            if (response.ok) {
                setSecurityQuestionVisible(false);
                setNewPasswordFormVisible(true);
            }
        }).catch((error) => {
            console.log("Couldn't fetch security");
        })
    }

    // Submit new password
    const submitNewPassword = async (event) => {
        event.preventDefault();

        if (pass !== passConfirm) { // check passwords match
            alert("Passwords does not match! Re-enter your password.");
            return;
        } else {
            await fetch("https://stonkponk.com/new-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                })
            }).then((response) => {
                if (response.ok) {
                    setNewPasswordFormVisible(false);
                    setResetSuccess(true);

                    redirectToLogin();
                    return;
                }
                alert('Could not fetch security questions. Please try again.');
            }).catch((error) => {
                console.log("Couldn't fetch security questions.");
            });
        }
    }

    return (
        <PasswordResetPageContainer>
                <ParticleContainer>
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
                <PasswordResetBackground>
                    <LogoContainer><PasswordResetLogo src={logo} alt="Stonk Ponk Logo" /></LogoContainer>
                    {emailFormVisible &&
                        <FormContainer>
                            <h1 id="password-reset-title">Reset your password</h1>
                            <GenericForm onSubmit={(e) => {submitPasswordForm(e)}}>
                                <Label htmlFor="email">Enter your email below</Label>
                                <TextField id="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                                <GenericSubmitButton type="submit" value="Submit" aria-label="Button to submit your email"/>
                            </GenericForm>
                        </FormContainer>
                    }
                    {securityQuestionVisible  &&
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {submitSecurityQuestion(e)}}>
                                <h1>Your security question:</h1>
                                <div>{securityQuestion}</div>
                                <Label htmlFor="security-question-answer">Enter your answer below</Label>
                                <TextField type="text" id="security-question-answer" required onChange={(e) => {setAnswer(e.target.value)}} />
                                <GenericSubmitButton type="submit" id="security-question-submit" value="Submit" aria-label="Button to submit your email" />
                            </GenericForm>
                        </FormContainer>
                    }
                    {newPasswordFormVisible && 
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {submitNewPassword(e)}}>
                                <h1>Create your new password below:</h1>
                                <Label htmlFor="new-password">New Password</Label>
                                <TextField type="text" id="new-password" required onChange={(e) => {setPass(e.target.value)}} />
                                <Label htmlFor="new-password-confirm">Confirm Password</Label>
                                <TextField type="text" id="new-password-confirm" required onChange={(e) => {setPassConfirm(e.target.value)}} />
                                <GenericSubmitButton type="submit" value="Submit" aria-label="Button to submit your new password"></GenericSubmitButton>
                            </GenericForm>
                        </FormContainer>
                    }
                    {resetSuccess &&
                        <h1>Hooray! You've reset your password.</h1>
                    }
                </PasswordResetBackground>
        </PasswordResetPageContainer>
    )
}

export default PasswordReset;