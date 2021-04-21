import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import logo from "../images/logo.png";
import { settings } from "../services/settings";

import { CollapsedNavItem, CollapsedNavList, CompanyName, NavList, NavListItem } from "../css/Text";
import {
	LogoContainer,
	MenuContainer,
	NavigationContainer,
	PhotoMenuContainer,
	ProfileModal,
	ProfileModaItem,
	ProfilePhotoContainer,
	SideBar,
} from "../css/Div";
import { DefaultLogo } from "../css/Logo";
import { ProfilePhoto } from "../css/Image";
import { MenuButtonContainer, NavCloseButton } from "../css/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Navigation - Responsive navigation bar shown at the top of each page across the website.
 * @param {*} settings - indicates whether the navigation bar is atop the settings page,
 * changing the styling of the profile picture.
 */
function Navigation(props) {
	// Profile modal details
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [loaded, setLoaded] = useState(false);

	const history = useHistory();

	// Used to track errors
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// Redirect to settings
	const redirect = (path) => {
		history.push(path);
	};

	// Logout of the website
	function logout(event) {
		// event.preventDefault();
		localStorage.removeItem("token");
		history.push("/");
	}
	// useEffect to get data about the current logged in user
	useEffect(() => {
		settings
			.getUser()
			.then((response) => response.json())
			.then((json) => {
				setFirstName(json.first_name);
				setLastName(json.last_name);
				setProfilePic(json.image);
				setLoaded(true);
			})
			.catch(() => {
				setError(true);
				setErrorMsg("Could not retrieve your details properly, please refresh.");
			});
	}, []);

	return (
		<NavigationContainer>
			<LogoContainer>
				<DefaultLogo navigation src={logo} alt="Stonk Ponk Logo" />
				<CompanyName>Stonk Ponk</CompanyName>
			</LogoContainer>
			<NavList>
				<NavListItem>
					<NavLink to="/market">Market</NavLink>
				</NavListItem>
				<NavListItem>
					<NavLink to="/portfolio">Portfolio</NavLink>
				</NavListItem>
				<NavListItem>
					<NavLink to="/watchlist">Watchlist</NavLink>
				</NavListItem>
				<NavListItem>
					<NavLink to="/news">News</NavLink>
				</NavListItem>
				<NavListItem>
					<NavLink to="/education">Education</NavLink>
				</NavListItem>
			</NavList>
			{!loaded ? (
				<CircularProgress />
			) : (
				<>
					<PhotoMenuContainer>
						<ProfilePhotoContainer>
							{!props.settings ? (
								<ProfilePhoto
									className="profile-photo"
									src={profilePic}
									alt="Your profile picture"
									onClick={() => setProfileModalOpen(!profileModalOpen)}
								/>
							) : (
								<ProfilePhoto
									className="profile-photo"
									src={profilePic}
									alt="Your profile picture"
									style={{ border: "3px solid #FFF" }}
									onClick={() => setProfileModalOpen(!profileModalOpen)}
								/>
							)}
						</ProfilePhotoContainer>
						<Menu />
					</PhotoMenuContainer>
				</>
			)}
			{profileModalOpen && (
				<ProfileModal>
					{error && (
						<Alert onClose={() => setError(false)} variant="filled" severity="error">
							{errorMsg}
						</Alert>
					)}
					<ProfilePhotoContainer>
						<ProfilePhoto className="profile-photo" src={profilePic} alt="Your profile picture" />
					</ProfilePhotoContainer>
					<h2>
						{firstName} {lastName}
					</h2>
					<ProfileModaItem className="profile-modal-item" onClick={() => redirect("/settings")}>
						Settings
					</ProfileModaItem>
					<ProfileModaItem className="profile-modal-item" onClick={() => redirect("/contact-us")}>
						Contact Us
					</ProfileModaItem>
					<ProfileModaItem
						onClick={() => {
							logout();
						}}
						className="profile-modal-item"
					>
						Logout
					</ProfileModaItem>
				</ProfileModal>
			)}
		</NavigationContainer>
	);
}

export const Menu = () => {
	const [open, setOpen] = useState(false);
	return (
		<MenuContainer>
			<MenuButton onClick={() => setOpen(!open)} open={open} key={0} />
			<SideBar open={open}>
				<NavCloseButton className="closeBtn" onClick={() => setOpen(false)}>
					&times;
				</NavCloseButton>
				<CollapsedNavList>
					<NavLink to="/market">
						<CollapsedNavItem>Market</CollapsedNavItem>
					</NavLink>
					<NavLink to="/portfolio">
						<CollapsedNavItem>Portfolio</CollapsedNavItem>
					</NavLink>
					<NavLink to="/watchlist">
						<CollapsedNavItem>Watchlist</CollapsedNavItem>
					</NavLink>
					<NavLink to="/news">
						<CollapsedNavItem>News</CollapsedNavItem>
					</NavLink>
					<NavLink to="/education">
						<CollapsedNavItem>Education</CollapsedNavItem>
					</NavLink>
				</CollapsedNavList>
			</SideBar>
		</MenuContainer>
	);
};

export const MenuButton = ({ open, onClick }) => {
	return (
		<MenuButtonContainer onClick={onClick} className="menu-button" aria-label="Toggle Menu" aria-expanded={open}>
			<svg viewBox="0 0 100 100" width="50" height="50">
				<rect x="20" y="20" width="60" height="8" fill="white" />
				<rect x="20" y="45" width="60" height="8" fill="white" />
				<rect x="20" y="70" width="60" height="8" fill="white" />
			</svg>
		</MenuButtonContainer>
	);
};

export default Navigation;
