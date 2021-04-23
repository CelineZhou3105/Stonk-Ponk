import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { checkPassword } from "../helpers/helpers";
import { settings } from "../services/settings";
import { admin } from "../services/admin";

import { TextField, SettingsLabel, SettingsModalLabel, UploadImage } from "../css/Form";
import {
	AdminContainer,
	AdminControlsContainer,
	FlexRowLeftDiv,
	FlexColumnLeftDiv,
	PageContainer,
	LineDivider,
	SettingRowDiv,
	SettingEditRowDiv,
	SettingFieldDiv,
	ModalContainer,
	ModalContent,
	SettingModalDiv,
	FlexColumnCenterDiv,
	ProfilePictureContainer,
} from "../css/Div";
import Navigation from "./Navigation";
import { EditButton, SaveButton, CancelButton, CloseButton, CustomButton } from "../css/Button";
import { SettingsPhoto } from "../css/Image";
import { PageTitle, AdminPriority, SubText, ColorText } from "../css/Text";

import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Settings - Page where the user can see their details (first & last name) and change their password.
 */
const Settings = () => {
	const history = useHistory();

	// initialise variables
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAdd, setEmailAdd] = useState("");
	const [passNew, setPassNew] = useState("");
	const [passOld, setPassOld] = useState("");
	const [passConfirm, setPassConfirm] = useState("");

	const [oldFirstName, setOldFirstName] = useState("");
	const [oldLastName, setOldLastName] = useState("");
	const [oldEmail, setOldEmail] = useState("");

	const [nameDisabled, setNameDisabled] = useState(true);
	const [emailDisabled, setEmailDisabled] = useState(true);
	const [detailModalDisabled, setDetailModalDisabled] = useState(true);
	const [profileModalDisabled, setProfileModalDisabled] = useState(true);

	const [profileImage, setProfileImage] = useState("");
	const [base64Image, setBase64Image] = useState("");
	const [uploadDisabled, setUploadDisabled] = useState(true);

	const [loaded, setLoaded] = useState(false);

	const [isAdmin, setIsAdmin] = useState(false);

	const [stockApiDisabled, setStockApiDisabled] = useState(true);
	const [newsApiDisabled, setNewsApiDisabled] = useState(true);
	const [forexApiDisabled, setForexApiDisabled] = useState(true);

	// For the Stock priority Form
	const [yahooStockPriority, setYahooStockPriority] = useState(1);
	const [alphaStockPriority, setAlphaStockPriority] = useState(2);
	const [oldYahooStockPriority, setOldYahooStockPriority] = useState(yahooStockPriority);
	const [oldAlphaStockPriority, setOldAlphaStockPriority] = useState(alphaStockPriority);

	// For the News Form
	const [yahooNewsPriority, setYahooNewsPriority] = useState(0);
	const [googleNewsPriority, setGoogleNewsPriority] = useState(0);
	const [oldYahooNewsPriority, setOldYahooNewsPriority] = useState(yahooNewsPriority);
	const [oldGoogleNewsPriority, setOldGoogleNewsPriority] = useState(googleNewsPriority);

	// For the Forex form
	const [yahooForexPriority, setYahooForexPriority] = useState(0);
	const [alphaForexPriority, setAlphaForexPriority] = useState(0);
	const [oldYahooForex, setOldYahooForex] = useState(yahooForexPriority);
	const [oldAlphaForex, setOldAlphaForex] = useState(alphaForexPriority);

	// Handling errors on forms
	const [forexPriorityError, setForexPriorityError] = useState(false);
	const [newsPriorityError, setNewsPriorityError] = useState(false);
	const [stockPriorityError, setStockPriorityError] = useState(false);
	const [priorityErrorMsg, setPriorityErrorMsg] = useState('');
	
	/*Get the priorities of the API */

	// Handle errors when they are returned by the fetch calls
	const handleError = useCallback(
		(error) => {
			setError(true);
			if (error === "Expired token") {
				setErrorMsg("Your session has expired. Logging out...");
				setTimeout(() => {
					localStorage.removeItem("token");
					history.push("/");
				}, 3000);
			} else {
				setErrorMsg(error);
			}
		},
		[history]
	);

	// Forex
	useEffect(() => {
		admin.getForexApiPriority()
		.then((response => {
			console.log("FOREX:", response);
			// Responses looks like: {"forex_api_priorities": [{"name": "alphavantage", "priority": 1}, {"name": "yahoo_finance", "priority": 2}]}
			const alpha = response.forex_api_priorities[0].priority;
			const yahoo = response.forex_api_priorities[1].priority;
			
			setOldYahooForex(yahoo);
			setYahooForexPriority(yahoo);

			setOldAlphaForex(alpha);
			setAlphaForexPriority(alpha);
		}))
		.catch(error => {
			handleError(error);
		})
	}, [handleError]);

	// News
	useEffect(() => {
		admin.getNewsPriority()
		.then((response => {
			console.log("NEWS:", response);
			// Responses looks like: {"news_api_priorities": [{"name": "yahoo_fin_news", "priority": 1}, {"name": "google_news", "priority": 2}]}
			const yahoo = response.news_api_priorities[0].priority;
			const google = response.news_api_priorities[1].priority;

			setOldYahooNewsPriority(yahoo);
			setYahooNewsPriority(yahoo);

			setOldGoogleNewsPriority(google);
			setGoogleNewsPriority(google);
		})).catch(error => {
			handleError(error);
		})
	}, [handleError]);

	// Stocks 
	useEffect(() => {
		admin.getStockPriority()
		.then((response => {
			console.log("STOCKS:", response);
			// Responses looks like: {"stock_api_priorities": [{"name": "yahoo_fin", "priority": 1}, {"name": "alpha_vantage", "priority": 2}]}
			const yahoo = response.stock_api_priorities[0].priority;
			const alpha = response.stock_api_priorities[1].priority;

			setOldYahooStockPriority(yahoo);
			setYahooStockPriority(yahoo);

			setOldAlphaStockPriority(alpha);
			setAlphaStockPriority(alpha);
		})).catch(error => {
			handleError(error);
		})
	}, [handleError]);

	// Tracks when errors occurs - for showing error banners to the user
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// Upon successful change of credentials - for showing success banner to user
	const [success, setSuccess] = useState(false);

	// useEffect to get user's data from the backend
	useEffect(() => {
		settings
			.getUser()
			.then((response) => response.json())
			.then((json) => {
				setFirstName(json.first_name);
				setLastName(json.last_name);
				setEmailAdd(json.email);
				setProfileImage(json.image);
				setLoaded(true);
			})
			.catch((error) => {
				handleError(error);
			});
	}, [handleError]);

	// Function to check whether user is an admin
	useEffect(() => {
		admin.checkAdmin()
			.then((response) => {
				if (response.is_admin === true) {
					setIsAdmin(true);
				}
			})
			.catch((error) => {
				handleError(error);
				// Else, do nothing because the user is not an admin
			});
	}, [handleError]);

	// Function to edit the name of the user
	const EditName = () => {
		setNameDisabled(true);
		settings.changeName(firstName, lastName);
	};

	// Function to edit the email of the user
	const EditEmail = () => {
		setEmailDisabled(true);
		settings
			.changeEmail(emailAdd)
			.then(() => {
				setSuccess(true);
				setTimeout(() => {
					localStorage.removeItem("token");
					history.push("/");
				}, 3000);
			})
			.catch((error) => {
				handleError(error);
			});
	};
	const ChangePassword = () => {
		const checkResult = checkPassword(passNew, passConfirm);
		if (checkResult === "success") {
			settings
				.changePassword(passNew, passOld)
				.then(() => {
					setSuccess(true);
					setDetailModalDisabled(true);
					setTimeout(() => {
						localStorage.removeItem("token");
						history.push("/");
					}, 3000);
				})
				.catch((error) => {
					// Password didn't change properly
					if (error === "Expired Token") {
						setError(true);
						setErrorMsg("Old password is incorrect. Please re-enter your password.");
					} else {
						setError(true);
						setErrorMsg("Something went wrong with changing your password. Please try again.");
					}
				});
		} else {
			setError(true);
			setErrorMsg(checkResult);
		}
	};

	const CancelName = () => {
		setFirstName(oldFirstName);
		setLastName(oldLastName);
		setNameDisabled(true);
	};

	const CancelEmail = () => {
		setEmailAdd(oldEmail);
		setEmailDisabled(true);
	};

	const convertToBase64 = (image) => {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = () => {
			setBase64Image(reader.result);
			setUploadDisabled(false);
		};
	};

	const changeProfilePic = () => {
		settings
			.changeProfilePicture(base64Image)
			.then(() => {
				setProfileImage(base64Image);
				setProfileModalDisabled(true);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
				handleError(error);
			});
	};

	// Cancel the Forex Priority form and disable it 
	const CancelForexPriority = (e) => {
		e.preventDefault();
		setForexPriorityError(false);
		setAlphaForexPriority(oldAlphaForex);
		setYahooForexPriority(oldYahooForex);
		setForexApiDisabled(true);
	};

	// Change the Forex Priority form (make api call)
	const ChangeForexPriority = (e) => {
		e.preventDefault();
		setForexPriorityError(false);

		// Check the forms have valid inputs (must be positive integers)
		if (alphaForexPriority > 0 && yahooForexPriority > 0) {
			admin
			.setForexApiPriority(alphaForexPriority, yahooForexPriority)
			.then(() => {
				setForexApiDisabled(true);
				setOldAlphaForex(alphaForexPriority);
				setOldYahooForex(yahooForexPriority);
			})
			.catch((error) => {
				console.log(error);
			});
		} else {
			setForexPriorityError(true);
			setPriorityErrorMsg('Priorities must be positive integers.');
		}
	};

	// Cancel the News Priority form and disable it 
	const CancelNewsPriority = (e) => {
		e.preventDefault();
		setNewsPriorityError(false);

		setYahooNewsPriority(oldYahooNewsPriority);
		setGoogleNewsPriority(oldGoogleNewsPriority);
		setNewsApiDisabled(true);
	};

	// Change the News Priority form (make api call)
	const ChangeNewsPriority = (e) => {
		e.preventDefault();
		setNewsPriorityError(false);
		if (googleNewsPriority > 0 && yahooNewsPriority > 0) {
			admin
			.setNewsPriority(googleNewsPriority, yahooNewsPriority)
			.then(() => {
				setNewsApiDisabled(true);
			})
			.catch((error) => {
				console.log(error);
			});
		} else {
			setNewsPriorityError(true);
			setPriorityErrorMsg('Priorities must be positive integers.');
		}
	};

	// Cancel the Stock Priority form and disable it 
	const CancelStockPriority = (e) => {
		e.preventDefault();
		setStockPriorityError(false);
		setAlphaStockPriority(oldAlphaStockPriority);
		setYahooStockPriority(oldYahooStockPriority);
		setStockApiDisabled(true);
	};

	// Change the Forex Priority form (make api call)
	const ChangeStockPriority = (e) => {
		e.preventDefault();
		setStockPriorityError(false);
		if (yahooStockPriority > 0 && alphaStockPriority > 0) {
			admin
			.setStockPriority(yahooStockPriority, alphaStockPriority)
			.then(() => {
				setStockApiDisabled(true);
			})
			.catch((error) => {
				console.log(error);
			});
		} else {
			setStockPriorityError(true);
			setPriorityErrorMsg('Priorities must be positive integers.');
		}
	};
	return (
		<div>
			<Navigation settings="true" />
			{success && (
				<Alert onClose={() => setSuccess(false)} variant="filled" severity="success">
					You changed your login credentials! Please log in again. Logging out...
				</Alert>
			)}
			{error && (
				<Alert onClose={() => setError(false)} variant="filled" severity="error">
					{errorMsg}
				</Alert>
			)}
			<PageContainer>
				{!loaded ? (
					<CircularProgress />
				) : (
					<>
						<PageTitle>Account Settings</PageTitle>
						<FlexRowLeftDiv>
							<ProfilePictureContainer>
								<SettingsPhoto src={profileImage} alt="Your profile picture" />
								<CustomButton
									backgroundColor="#9e22ff"
									hoverColor="#b55cfa"
									margin="10px"
									aria-label="open up form to change profile picture"
									onClick={() => setProfileModalDisabled(false)}
								>
									Change Profile Picture
								</CustomButton>
								{!profileModalDisabled && (
									<ModalContainer>
										<ModalContent style={{ padding: "5px" }}>
											<CloseButton
												onClick={() => {
													setProfileModalDisabled(true);
													setUploadDisabled(true);
												}}
											>
												&times;
											</CloseButton>
											<FlexColumnCenterDiv>
												<SettingModalDiv style={{ width: "40%" }}>
													<SettingsModalLabel
														htmlFor="uploadProfile"
														style={{ width: "100%" }}
													>
														Upload Profile Picture
													</SettingsModalLabel>
													<UploadImage
														id="uploadProfile"
														type="file"
														accept=".png, .jpg"
														onChange={(e) => convertToBase64(e.target.files[0])}
													/>
												</SettingModalDiv>

												<CustomButton
													backgroundColor="#9e22ff"
													hoverColor="#b55cfa"
													aria-label="save uploaded profile picture"
													onClick={changeProfilePic}
													disabled={uploadDisabled}
													margin="5%"
												>
													Save Profile Picture
												</CustomButton>
											</FlexColumnCenterDiv>
										</ModalContent>
									</ModalContainer>
								)}
							</ProfilePictureContainer>
							<FlexColumnLeftDiv style={{ width: "80%" }}>
								<SettingRowDiv style={{ width: "100%", height: "80px", fontWeight: "bold" }}>
									<SettingFieldDiv>
										<SettingsLabel htmlFor="firstName">First Name</SettingsLabel>
										<TextField
											type="text"
											id="firstName"
											value={firstName}
											disabled={nameDisabled}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</SettingFieldDiv>
									<SettingFieldDiv>
										<SettingsLabel htmlFor="lastName">Last Name</SettingsLabel>
										<TextField
											type="text"
											id="lastName"
											value={lastName}
											disabled={nameDisabled}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</SettingFieldDiv>
									<SettingFieldDiv>
										{nameDisabled ? (
											<EditButton
												aria-label="Edit Name Button"
												onClick={() => {
													setNameDisabled(false);
													setOldFirstName(firstName);
													setOldLastName(lastName);
												}}
											>
												Edit Name
											</EditButton>
										) : (
											<SettingEditRowDiv>
												<SaveButton
													aria-label="Save changes to names button"
													onClick={EditName}
												>
													Save
												</SaveButton>
												<CancelButton
													aria-label="Cancel changes to names button"
													onClick={CancelName}
												>
													Cancel
												</CancelButton>
											</SettingEditRowDiv>
										)}
									</SettingFieldDiv>
								</SettingRowDiv>
								<SettingRowDiv style={{ width: "60%", height: "80px", fontWeight: "bold" }}>
									<SettingFieldDiv>
										<SettingsLabel htmlFor="emailAdd">Email</SettingsLabel>
										<TextField
											type="text"
											id="emailAdd"
											value={emailAdd}
											disabled={emailDisabled}
											onChange={(e) => setEmailAdd(e.target.value)}
										/>
									</SettingFieldDiv>
									<SettingFieldDiv>
										{emailDisabled ? (
											<EditButton
												aria-label="Edit Email Button"
												onClick={() => {
													setEmailDisabled(false);
													setOldEmail(emailAdd);
												}}
											>
												Edit Email
											</EditButton>
										) : (
											<SettingEditRowDiv>
												<SaveButton
													aria-label="Save changes to Email button"
													onClick={EditEmail}
												>
													Save
												</SaveButton>
												<CancelButton
													aria-label="Cancel changes to Email button"
													onClick={CancelEmail}
												>
													Cancel
												</CancelButton>
											</SettingEditRowDiv>
										)}
									</SettingFieldDiv>
								</SettingRowDiv>
								<SettingRowDiv>
									<EditButton
										aria-label="Edit password Button"
										onClick={() => setDetailModalDisabled(false)}
									>
										Edit Password
									</EditButton>
								</SettingRowDiv>
								{!detailModalDisabled && (
									<ModalContainer>
										<ModalContent>
											<CloseButton onClick={() => setDetailModalDisabled(true)}>
												&times;
											</CloseButton>
											<FlexColumnCenterDiv>
												<SettingModalDiv>
													<SettingsModalLabel htmlFor="passOld">
														Old Password
													</SettingsModalLabel>
													<TextField
														type="password"
														id="passOld"
														value={passOld}
														required
														onChange={(e) => setPassOld(e.target.value)}
													></TextField>
													<SettingsModalLabel htmlFor="passNew">
														New Password
													</SettingsModalLabel>
													<TextField
														type="password"
														id="passNew"
														value={passNew}
														required
														onChange={(e) => setPassNew(e.target.value)}
													></TextField>
													<SettingsModalLabel htmlFor="passConfirm">
														Confirm Password
													</SettingsModalLabel>
													<TextField
														type="password"
														id="passConfirm"
														value={passConfirm}
														required
														onChange={(e) => setPassConfirm(e.target.value)}
													></TextField>
												</SettingModalDiv>
												<EditButton
													aria-label="Save password button"
													onClick={ChangePassword}
													style={{ marginTop: "8%" }}
												>
													Save Password
												</EditButton>
											</FlexColumnCenterDiv>
										</ModalContent>
									</ModalContainer>
								)}
							</FlexColumnLeftDiv>
						</FlexRowLeftDiv>
						<LineDivider />
						{isAdmin && (
							<AdminContainer>
								<PageTitle>Admin Controls</PageTitle>
								
								<AdminContainer>
									<AdminContainer>
										<form>
										<AdminControlsContainer>
											<AdminPriority>Forex API Priority:</AdminPriority>
											{forexApiDisabled ? (
												<EditButton
													aria-label="Edit Forex API Priority Button"
													onClick={(e) => {
														e.preventDefault();
														setForexApiDisabled(false);
													}}
												>
													Edit Forex API Priority
												</EditButton>
											) : (
												<SettingEditRowDiv>
													<SaveButton
														aria-label="Save changes to forex api button"
														type="submit"
														onClick={e => ChangeForexPriority(e)}
													>
														Save
													</SaveButton>
													<CancelButton
														aria-label="Cancel changes to forex api button"
														onClick={e => CancelForexPriority(e)}
													>
														Cancel
													</CancelButton>
												</SettingEditRowDiv>
											)}
										</AdminControlsContainer>
										<SubText>Enter the priority of the Forex APIs (in integers)</SubText>
										{forexPriorityError && (
											<div>
												<ColorText color="red">{priorityErrorMsg}</ColorText>
											</div>
										)}
										<label htmlFor="alphaForex">Alpha vantage</label>
										<TextField
											type="number"
											id="alphaForex"
											value={alphaForexPriority}
											onChange={(e) => setAlphaForexPriority(e.target.value)}
											disabled={forexApiDisabled}
										/>
										<label htmlFor="yahooForex">Yahoo Finance</label>
										<TextField
											type="number"
											id="yahooForex"
											value={yahooForexPriority}
											onChange={(e) => setYahooForexPriority(e.target.value)}
											disabled={forexApiDisabled}
										/>
									</form>
									</AdminContainer>
								</AdminContainer>

								{/* Form for News API Priority */}
								<AdminContainer>
									<AdminContainer>
										<form>
											<AdminControlsContainer>
												<AdminPriority>News API Priority:</AdminPriority>
												{newsApiDisabled ? (
													<EditButton
														aria-label="Edit News API Priority Button"
														onClick={(e) => {
															e.preventDefault();
															setNewsApiDisabled(false);
														}}
													>
														Edit News API Priority
													</EditButton>
												) : (
													<SettingEditRowDiv>
														<SaveButton
															aria-label="Save changes to news api button"
															onClick={e => ChangeNewsPriority(e)}
														>
															Save
														</SaveButton>
														<CancelButton
															aria-label="Cancel changes to news api button"
															onClick={e => CancelNewsPriority(e)}
														>
															Cancel
														</CancelButton>
													</SettingEditRowDiv>
												)}
											</AdminControlsContainer>
											<SubText>Enter the priority of the News APIs (in integers)</SubText>
											{newsPriorityError && (
												<div>
													<ColorText color="red">{priorityErrorMsg}</ColorText>
												</div>
											)}
											<label htmlFor="googleNews">Google News</label>
											<TextField
												type="number"
												id="googleNews"
												value={googleNewsPriority}
												onChange={(e) => setGoogleNewsPriority(e.target.value)}
												min={1}
												disabled={newsApiDisabled}
											/>
											<label htmlFor="yahooNews">Yahoo News</label>
											<TextField
												type="number"
												id="yahooNews"
												value={yahooNewsPriority}
												onChange={(e) => setYahooNewsPriority(e.target.value)}
												min={1}
												disabled={newsApiDisabled}
											/>
										</form>
									</AdminContainer>
								</AdminContainer>

								<AdminContainer>
									<AdminContainer>
										<form>
											<AdminControlsContainer>
												<AdminPriority>Stock API Priority:</AdminPriority>
												{stockApiDisabled ? (
													<EditButton
														aria-label="Edit Stocks API Priority Button"
														onClick={(e) => {
															e.preventDefault();
															setStockApiDisabled(false);
														}}
													>
														Edit Stock API Priority
													</EditButton>
												) : (
													<SettingEditRowDiv>
														<SaveButton
															aria-label="Save changes to stock api button"
															onClick={e => ChangeStockPriority(e)}
														>
															Save
														</SaveButton>
														<CancelButton
															aria-label="Cancel changes to stock api button"
															onClick={e => CancelStockPriority(e)}
														>
															Cancel
														</CancelButton>
													</SettingEditRowDiv>
												)}
											</AdminControlsContainer>
											<SubText>Enter the priority of the Stock APIs (in integers)</SubText>
											{stockPriorityError && (
												<div>
													<ColorText color="red">{priorityErrorMsg}</ColorText>
												</div>
											)}
											<label htmlFor="yahooFin">Yahoo Finance</label>
											<TextField
												type="number"
												id="yahooFin"
												value={yahooStockPriority}
												onChange={(e) => setYahooStockPriority(e.target.value)}
												min={1}
												disabled={stockApiDisabled}
											/>
											<label htmlFor="alphaVantage">Alphavantage</label>
											<TextField
												type="number"
												id="alphaVantage"
												value={alphaStockPriority}
												onChange={(e) => setAlphaStockPriority(e.target.value)}
												min={1}
												disabled={stockApiDisabled}
											/>
										</form>
									</AdminContainer>
								</AdminContainer>
							</AdminContainer>
						)}
					</>
				)}
			</PageContainer>
		</div>
	);
};

export default Settings;
