import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, SettingsLabel, SettingsModalLabel, UploadImage } from "../css/Form";
import {
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
import profile from "../images/blobfish.png";
import { PageTitle } from "../css/Text";
import { checkPassword } from "../helpers/helpers";
import { settings } from "../services/settings";
import Alert from "@material-ui/lab/Alert";

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

	const [profileImage, setProfileImage] = useState(profile);
	const [newProfileImage, setNewProfileImage] = useState("");

	// Tracks when errors occurs - for showing error banners to the user
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// Upon successful change of credentials - for showing success banner to user
	const [success, setSuccess] = useState(false);

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

	// useEffect to get user's data from the backend
	useEffect(() => {
		settings
			.getUser()
			.then((response) => response.json())
			.then((json) => {
				setFirstName(json.first_name);
				setLastName(json.last_name);
				setEmailAdd(json.email);
			})
			.catch((error) => {
				handleError(error);
			});
	}, [handleError]);

	// Function to edit the name of the user
	const EditName = () => {
		setNameDisabled(true);
		setOldFirstName(firstName);
		setOldLastName(lastName);
		settings.changeName(firstName, lastName);
	};

	// Function to edit the email of the user
	const EditEmail = () => {
		setEmailDisabled(true);
		setOldEmail(emailAdd);
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

	const changeProfilePic = () => {
		console.log(newProfileImage);
		setProfileImage(newProfileImage.name);
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
								<ModalContent style={{ width: "80%", padding: "5px" }}>
									<CloseButton onClick={() => setProfileModalDisabled(true)}>&times;</CloseButton>
									<FlexColumnCenterDiv>
										{/* <ImageUploader
                                            withIcon={true}
                                            withPreview={true}
                                            buttonText="Choose Image"
                                            fileSizeError="file size is too big"
                                            fileTypeError=" is not supported file extension"
                                            onChange={(e) => setNewProfileImage(e)}
                                            singleImage={true}
                                        /> */}
										<CustomButton
											backgroundColor="#9e22ff"
											hoverColor="#b55cfa"
											aria-label="save uploaded profile picture"
											onClick={changeProfilePic}
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
									<EditButton aria-label="Edit Name Button" onClick={() => setNameDisabled(false)}>
										Edit Name
									</EditButton>
								) : (
									<SettingEditRowDiv>
										<SaveButton aria-label="Save changes to names button" onClick={EditName}>
											Save
										</SaveButton>
										<CancelButton aria-label="Cancel changes to names button" onClick={CancelName}>
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
									<EditButton aria-label="Edit Email Button" onClick={() => setEmailDisabled(false)}>
										Edit Email
									</EditButton>
								) : (
									<SettingEditRowDiv>
										<SaveButton aria-label="Save changes to Email button" onClick={EditEmail}>
											Save
										</SaveButton>
										<CancelButton aria-label="Cancel changes to Email button" onClick={CancelEmail}>
											Cancel
										</CancelButton>
									</SettingEditRowDiv>
								)}
							</SettingFieldDiv>
						</SettingRowDiv>
						<SettingRowDiv>
							<EditButton aria-label="Edit password Button" onClick={() => setDetailModalDisabled(false)}>
								Edit Password
							</EditButton>
						</SettingRowDiv>
						{!detailModalDisabled && (
							<ModalContainer>
								<ModalContent>
									<CloseButton onClick={() => setDetailModalDisabled(true)}>&times;</CloseButton>
									<FlexColumnCenterDiv>
										<SettingModalDiv>
											<SettingsModalLabel htmlFor="passOld">Old Password</SettingsModalLabel>
											<TextField
												type="password"
												id="passOld"
												value={passOld}
												required
												onChange={(e) => setPassOld(e.target.value)}
											></TextField>
											<SettingsModalLabel htmlFor="passNew">New Password</SettingsModalLabel>
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
				<FlexRowLeftDiv>
					<label class="switch">
						<input type="checkbox" />
						<span class="slider" />
					</label>
					<FlexColumnLeftDiv>
						<h3>Suggestions</h3>
						<p>These are suggestions on how to improve your portfolio over time.</p>
						<p>
							Depending on the composition of your portfolio and earnings, we will give you suggestions on
							your next investment move.
						</p>
					</FlexColumnLeftDiv>
				</FlexRowLeftDiv>
			</PageContainer>
		</div>
	);
};

export default Settings;
