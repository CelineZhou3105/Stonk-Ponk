import React, { useState } from 'react';
import logo from './logo.png';
import profile from './blobfish.PNG';

import {
    NavLink, useHistory,
} from "react-router-dom";

import { CompanyName, NavList, NavListItem } from '../css/Text';
import { LogoContainer, NavigationContainer, ProfileModaItem, ProfileModal, ProfilePhotoContainer } from '../css/Div';
import { DefaultLogo, ProfilePhoto } from '../css/Logo';

function Navigation() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const history = useHistory();
    const redirectToLogin = () => {
        history.push('/');
    }

    const navigateToSettings = () => {
        history.push('/settings');
    }

    const logout = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        await fetch(`https://stonk-ponk.com/logout/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            })
        }).then((response) => {
            if (response.ok) {
                redirectToLogin();
            }
        }).catch((error) => {
            // TODO - do something about this error
        });

        // TODO - remove this because redirection should only occur upon successful logout
        redirectToLogin();
    }

    return (
        <header>
            <NavigationContainer>
                <LogoContainer>
                    <DefaultLogo navigation src={logo} alt="Stonk Ponk Logo" />
                    <CompanyName>Stonk Ponk</CompanyName>
                </LogoContainer>
                <NavList>
                    <NavListItem><NavLink className="nav-item" to="/home">Summary</NavLink></NavListItem>
                    <NavListItem><NavLink className="nav-item" to="/education">Education</NavLink></NavListItem>
                    <NavListItem><NavLink className="nav-item" to="/portfolio">Portfolio</NavLink></NavListItem>
                    <NavListItem><NavLink className="nav-item" to="/market">Market</NavLink></NavListItem>
                    <NavListItem><NavLink className="nav-item" to="/watchlist">Watchlist</NavLink></NavListItem>
                </NavList>
                <ProfilePhotoContainer>
                    <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" onClick={() => setProfileModalOpen(!profileModalOpen)} />
                </ProfilePhotoContainer>
                {profileModalOpen &&
                    <ProfileModal>
                        <ProfilePhotoContainer>
                            <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" />
                        </ProfilePhotoContainer>
                        <h2>Samantha Anders</h2>
                        <ProfileModaItem className="profile-modal-item" onClick={navigateToSettings}>Settings</ProfileModaItem>
                        <ProfileModaItem className="profile-modal-item">Contact Us</ProfileModaItem>
                        <ProfileModaItem onClick={(e) => { logout(e) }} className="profile-modal-item">Logout</ProfileModaItem>
                    </ProfileModal>
                }
            </NavigationContainer>

        </header>
    )
}

export default Navigation;