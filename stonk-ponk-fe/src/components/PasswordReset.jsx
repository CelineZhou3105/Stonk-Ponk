import React, { useState } from 'react';
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom';

import logo from '../images/logo.png';

import { FormContainer, LogoContainer, ParticleContainer,  PasswordResetBackground, PasswordResetPageContainer} from '../css/Div';
import { GenericForm, GenericSubmitButton, InputUnderlineDiv, Label, TextField } from '../css/Form';
import { DefaultLogo } from '../css/Logo';

import { ResetPasswordCheckEmailLink, AnswerSecurityQuestionLink, ChangePasswordWithoutAuthLink} from '../api-links/constants';

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
        history.push("/");
    };
    
    /* resetPasswordCheckEmail - The first of three parts to the 'forgot password' user flow. User submits 
    their email to retrieve their security question.  

        Request = {
            email: string;
        }

        Response = {
            status: number (200 - OK, 403 - Invalid email/Unauthorised)
            security_question: string
        }

    */
    let securityQuestion;
    const resetPasswordCheckEmail = async (event) => {
        event.preventDefault();
        await fetch(ResetPasswordCheckEmailLink, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
            }),
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(res => {
                    securityQuestion = res.security_queston;
                })
                setEmailFormVisible(false);
                setSecurityQuestionVisible(true);
            }
        }).catch((error) => {
            return Promise.resolve(e => {
                alert(e.error);
            })
        });
    }

    /* answerSecurityQuestion - The second of three parts to the 'forgot password' user flow. User submits 
    the answer to their security question.
    
        Request = {
            email: string;
            answer: string;
        }
    
        Response = {
            status: number; (200 - OK, 403 - incorrect answer)
        }
    */
    const answerSecurityQuestion = async (event) => {
        event.preventDefault();
        await fetch(AnswerSecurityQuestionLink, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                answer: answer,
            })
        }).then((response) => {
            if (response.status === 200) {
                setSecurityQuestionVisible(false);
                setNewPasswordFormVisible(true);
            }
        }).catch((error) => {
            return Promise.resolve(e => {
                alert(e.error);
            })
        })
    }

    /* changePasswordWithoutAuth - The last of three parts to the 'forgot password' user flow. User submits
        their new password. 
    
        Request = {
            email: string;
            new_password: string;
        }
    
        Response = {
            status: number; (200 - OK)
        }
    */
    const changePasswordWithoutAuth = async (event) => {
        event.preventDefault();
        if (pass !== passConfirm) { // Check passwords match
            alert("Passwords does not match! Re-enter your password.");

            // TODO - Need to do further checks here for passwords meeting criteria. 
            return;
        } else {
            await fetch(ChangePasswordWithoutAuthLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    answer: answer,
                    new_password: pass,
                })
            }).then((response) => {
                if (response.ok) {
                    setNewPasswordFormVisible(false);
                    setResetSuccess(true);
                }
                alert('Could not fetch security questions. Please try again.');
            }).catch((error) => {
                return Promise.resolve(e => {
                    alert("Couldn't fetch security questions.");
                })
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
                    <LogoContainer><DefaultLogo src={logo} alt="Stonk Ponk Logo" /></LogoContainer>
                    {emailFormVisible &&
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {resetPasswordCheckEmail(e)}}>
                                <h1 id="password-reset-title">Reset your password</h1>
                                <Label htmlFor="email">Enter your email below</Label>
                                <TextField id="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                                <InputUnderlineDiv passwordReset className="underline"></InputUnderlineDiv>
                                <GenericSubmitButton type="submit" value="Next" aria-label="Button to submit your email"/>
                            </GenericForm>
                        </FormContainer>
                    }
                    {securityQuestionVisible  &&
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {answerSecurityQuestion(e)}}>
                                <h1>Your security question:</h1>
                                <div>{securityQuestion}</div>
                                <Label htmlFor="security-question-answer">Enter your answer below</Label>
                                <TextField type="text" id="security-question-answer" required onChange={(e) => {setAnswer(e.target.value)}} />
                                <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                                <GenericSubmitButton type="submit" id="security-question-submit" value="Submit" aria-label="Button to submit your email" />
                            </GenericForm>
                        </FormContainer>
                    }
                    {newPasswordFormVisible && 
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {changePasswordWithoutAuth(e)}}>
                                <h1>Create your new password below:</h1>
                                <Label htmlFor="new-password">New Password</Label>
                                <TextField type="password" id="new-password" required onChange={(e) => {setPass(e.target.value)}} />
                                <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                                <Label htmlFor="new-password-confirm">Confirm Password</Label>
                                <TextField type="password" id="new-password-confirm" required onChange={(e) => {setPassConfirm(e.target.value)}} />
                                <InputUnderlineDiv className="underline"></InputUnderlineDiv>
                                <GenericSubmitButton type="submit" value="Submit" aria-label="Button to submit your new password"></GenericSubmitButton>
                            </GenericForm>
                        </FormContainer>
                    }
                    {resetSuccess &&
                        <div>
                            <h1>Hooray! You've reset your password.</h1>
                            <button onClick={e => redirectToLogin(e)}>Back to login page.</button>
                        </div>
                    }
                </PasswordResetBackground>
        </PasswordResetPageContainer>
    )
}

export default PasswordReset;