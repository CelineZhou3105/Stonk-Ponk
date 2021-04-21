import React, { useState } from "react";
import Particles from "react-particles-js";
import { useHistory } from "react-router-dom";

import logo from "../images/logo.png";
import { ForgotPasswordLink } from "../api-links/constants";
import { checkPassword } from "../helpers/helpers";

import {
	FormContainer,
	LogoContainer,
	ParticleContainer,
	PasswordResetBackground,
	PasswordResetPageContainer,
} from "../css/Div";
import { GenericForm, InputUnderlineDiv, Label, TextField } from "../css/Form";
import { DefaultLogo } from "../css/Logo";
import { ColorText, PageTitle, SubTitle } from "../css/Text";
import { CustomButton } from "../css/Button";

/**
 * PasswordReset - This is the series of pages that the user goes through to reset their password
 * if they have forgotten it. Allows the user to change their password once they have given the correct
 * answer to their security question.
 */
function PasswordReset() {
	// Form values
	const [email, setEmail] = useState("");
	const [answer, setAnswer] = useState("");
	const [pass, setPass] = useState("");
	const [passConfirm, setPassConfirm] = useState("");

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

	// Handles errors
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	/* resetPasswordCheckEmail - The first of three parts to the 'forgot password' user flow. User submits 
    their email to retrieve their security question.  
    */
	const [securityQuestion, setSecurityQuestion] = useState("");
	const resetPasswordCheckEmail = async (event) => {
		event.preventDefault();
		await fetch(ForgotPasswordLink, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		})
			.then((response) => {
				if (response.status === 202) {
					response.json().then((res) => {
						setSecurityQuestion(res.question);
					});
					setEmailFormVisible(false);
					setSecurityQuestionVisible(true);
					setError(false);
				} else {
					setError(true);
					setErrorMsg("This email is not associated with an account. Please try again.");
				}
			})
			.catch(() => {
				setError(true);
				setErrorMsg("An error occured while getting submitting your email. Please try again.");
			});
	};

	/* answerSecurityQuestion - The second of three parts to the 'forgot password' user flow. User submits 
    the answer to their security question.
    */
	const answerSecurityQuestion = async (event) => {
		event.preventDefault();
		await fetch(ForgotPasswordLink, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				answer: answer,
			}),
		})
			.then((response) => {
				if (response.status === 202) {
					setSecurityQuestionVisible(false);
					setNewPasswordFormVisible(true);
					setError(false);
				} else {
					setError(true);
					setErrorMsg("Answer to your security question is incorrect. Please try again.");
				}
			})
			.catch(() => {
				setError(true);
				setErrorMsg("There was an error checking your security question answer. Please try again.");
			});
	};

	/* changePasswordWithoutAuth - The last of three parts to the 'forgot password' user flow. User submits
        their new password. 
    */
	const changePasswordWithoutAuth = async (event) => {
		event.preventDefault();
		const checkResult = checkPassword(pass, passConfirm);
		if (checkResult !== "success") {
			// Password is invalid, show error
			setError(true);
			setErrorMsg(checkResult);
			return;
		} else {
			await fetch(ForgotPasswordLink, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					answer: answer,
					new_password: pass,
				}),
			})
				.then((response) => {
					if (response.ok) {
						setNewPasswordFormVisible(false);
						setResetSuccess(true);
						setError(false);
					} else {
						setError(true);
						setErrorMsg("There was an error changing your password. Please try again.");
					}
				})
				.catch((error) => {
					setError(true);
					setErrorMsg("There was an error changing your password. Please try again.");
				});
		}
	};

	return (
		<PasswordResetPageContainer>
			<ParticleContainer>
				<Particles
					width={"100%"}
					height={"100%"}
					params={{
						particles: {
							number: {
								value: 70,
							},
							size: {
								value: 3,
							},
						},
						interactivity: {
							events: {
								onhover: {
									enable: true,
									mode: "repulse",
								},
							},
						},
					}}
				/>
			</ParticleContainer>
			<PasswordResetBackground>
				<LogoContainer>
					<a href="/">
						<DefaultLogo src={logo} alt="Stonk Ponk Logo" />
					</a>
				</LogoContainer>
				<PageTitle id="password-reset-title">Reset Password</PageTitle>
				{emailFormVisible && (
					<FormContainer>
						<GenericForm
							onSubmit={(e) => {
								resetPasswordCheckEmail(e);
							}}
						>
							<Label htmlFor="email">Enter your email below</Label>
							<TextField id="email" type="email" onChange={(e) => setEmail(e.target.value)} required />
							<InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
							{error && <ColorText color="red">{errorMsg}</ColorText>}
							<CustomButton
								margin="20px 0"
								type="submit"
								value="Next"
								aria-label="Button to submit your email"
							>
								Submit
							</CustomButton>
						</GenericForm>
					</FormContainer>
				)}
				{securityQuestionVisible && (
					<FormContainer>
						<GenericForm
							onSubmit={(e) => {
								answerSecurityQuestion(e);
							}}
						>
							<SubTitle>Your security question:</SubTitle>
							<ColorText color="#9e22ff">{securityQuestion}</ColorText>
							<Label htmlFor="security-question-answer">Enter your answer below</Label>
							<TextField
								type="text"
								id="security-question-answer"
								required
								onChange={(e) => {
									setAnswer(e.target.value);
								}}
							/>
							<InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
							{error && <ColorText color="red">{errorMsg}</ColorText>}
							<CustomButton
								margin="20px 0"
								type="submit"
								id="security-question-submit"
								value="Submit"
								aria-label="Button to submit your email"
							>
								Submit
							</CustomButton>
						</GenericForm>
					</FormContainer>
				)}
				{newPasswordFormVisible && (
					<FormContainer>
						<GenericForm
							onSubmit={(e) => {
								changePasswordWithoutAuth(e);
							}}
						>
							<SubTitle>Create your new password below:</SubTitle>
							<Label htmlFor="new-password">New Password</Label>
							<TextField
								type="password"
								id="new-password"
								required
								onChange={(e) => {
									setPass(e.target.value);
								}}
							/>
							<InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
							<Label htmlFor="new-password-confirm">Confirm Password</Label>
							<TextField
								type="password"
								id="new-password-confirm"
								required
								onChange={(e) => {
									setPassConfirm(e.target.value);
								}}
							/>
							<InputUnderlineDiv width="100%" className="underline"></InputUnderlineDiv>
							{error && <ColorText color="red">{errorMsg}</ColorText>}
							<CustomButton
								margin="20px 0"
								type="submit"
								value="Submit"
								aria-label="Button to submit your new password"
							>
								Submit
							</CustomButton>
						</GenericForm>
					</FormContainer>
				)}
				{resetSuccess && (
					<div>
						<SubTitle>Hooray! You've reset your password.</SubTitle>
						<CustomButton margin="0 auto" onClick={(e) => redirectToLogin(e)}>
							Back to Login.
						</CustomButton>
					</div>
				)}
			</PasswordResetBackground>
		</PasswordResetPageContainer>
	);
}

export default PasswordReset;
