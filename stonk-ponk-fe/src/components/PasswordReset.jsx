import React, { useState } from 'react';
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom';

import logo from '../images/logo.png';

import { FormContainer, LogoContainer, ParticleContainer,  PasswordResetBackground, PasswordResetPageContainer} from '../css/Div';
import { GenericForm, InputUnderlineDiv, Label, TextField } from '../css/Form';
import { DefaultLogo } from '../css/Logo';
import { ColorText, PageTitle, SubTitle } from '../css/Text';

import { ForgotPasswordLink } from '../api-links/constants';
import { CustomButton } from '../css/Button';

import { checkPassword } from '../helpers/helpers';

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
    const [securityQuestion, setSecurityQuestion] = useState('');
    const resetPasswordCheckEmail = async (event) => {
        event.preventDefault();
        await fetch(ForgotPasswordLink, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
            }),
        }).then((response) => {
            if (response.status === 202) {
                response.json().then(res => {
                    setSecurityQuestion(res.question);
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
    */
    const answerSecurityQuestion = async (event) => {
        event.preventDefault();
        await fetch(ForgotPasswordLink, {
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
            if (response.status === 202) {
                setSecurityQuestionVisible(false);
                setNewPasswordFormVisible(true);
            } else {
                alert("Answer to security question is incorrect.");
            }
        }).catch((error) => {
            return Promise.resolve(e => {
                alert(e);
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
        if (!checkPassword(pass, passConfirm)) { // Check password is valid
            return;
        } else {
            await fetch(ForgotPasswordLink, {
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
                    <LogoContainer>
                        <a href="/"><DefaultLogo src={logo} alt="Stonk Ponk Logo" /></a>
                    </LogoContainer>
                    <PageTitle id="password-reset-title">Reset Password</PageTitle>
                    {emailFormVisible &&
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {resetPasswordCheckEmail(e)}}>
                                <Label htmlFor="email">Enter your email below</Label>
                                <TextField id="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                                <InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
                                <CustomButton margin="20px 0" type="submit" value="Next" aria-label="Button to submit your email">Submit</CustomButton>
                            </GenericForm>
                        </FormContainer>
                    }
                    {securityQuestionVisible  &&
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {answerSecurityQuestion(e)}}>
                                <SubTitle>Your security question:</SubTitle>
                                <ColorText color="#9e22ff">{securityQuestion}</ColorText>
                                <Label htmlFor="security-question-answer">Enter your answer below</Label>
                                <TextField type="text" id="security-question-answer" required onChange={(e) => {setAnswer(e.target.value)}} />
                                <InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
                                <CustomButton margin="20px 0" type="submit" id="security-question-submit" value="Submit" aria-label="Button to submit your email">Submit</CustomButton>
                            </GenericForm>
                        </FormContainer>
                    }
                    {newPasswordFormVisible && 
                        <FormContainer>
                            <GenericForm onSubmit={(e) => {changePasswordWithoutAuth(e)}}>
                                <SubTitle>Create your new password below:</SubTitle>
                                <Label htmlFor="new-password">New Password</Label>
                                <TextField type="password" id="new-password" required onChange={(e) => {setPass(e.target.value)}} />
                                <InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
                                <Label htmlFor="new-password-confirm">Confirm Password</Label>
                                <TextField type="password" id="new-password-confirm" required onChange={(e) => {setPassConfirm(e.target.value)}} />
                                <InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
                                <CustomButton margin="20px 0" type="submit" value="Submit" aria-label="Button to submit your new password">Submit</CustomButton>
                            </GenericForm>
                        </FormContainer>
                    }
                    {resetSuccess &&
                        <div>
                            <SubTitle>Hooray! You've reset your password.</SubTitle>
                            <CustomButton margin="0 auto" onClick={e => redirectToLogin(e)}>Back to Login.</CustomButton>
                        </div>
                    }
                </PasswordResetBackground>
        </PasswordResetPageContainer>
    )
}

export default PasswordReset;
