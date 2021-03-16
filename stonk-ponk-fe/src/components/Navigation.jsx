import React, { useState } from 'react';
import logo from '../images/logo.png';
import profile from '../images/blobfish.png';

import { history } from '../helpers/history';

import { NavLink } from "react-router-dom";

import { CompanyName, NavList, NavListItem } from '../css/Text';
import { LogoContainer, NavigationContainer, ProfileModaItem, ProfileModal, ProfilePhotoContainer } from '../css/Div';
import { DefaultLogo } from '../css/Logo';
import { ProfilePhoto } from '../css/Image';
import { LoggedInHeader } from '../css/Header';

import { authentication } from '../services/authentication';

function Navigation() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const navigateToSettings = () => {
        history.push('/settings');
    }

    function logout(event) {
        authentication.logout(event);
        history.push('/');
    }

    return (
        <LoggedInHeader>
            <NavigationContainer>
                <LogoContainer>
                    <DefaultLogo navigation src={logo} alt="Stonk Ponk Logo" />
                    <CompanyName>Stonk Ponk</CompanyName>
                </LogoContainer>
                <NavList>
                    <NavListItem><NavLink to="/home">Summary</NavLink></NavListItem>
                    <NavListItem><NavLink to="/education">Education</NavLink></NavListItem>
                    <NavListItem><NavLink to="/portfolio">Portfolio</NavLink></NavListItem>
                    <NavListItem><NavLink to="/market">Market</NavLink></NavListItem>
                    <NavListItem><NavLink to="/watchlist">Watchlist</NavLink></NavListItem>
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
        </LoggedInHeader>
    )
}

export default Navigation;