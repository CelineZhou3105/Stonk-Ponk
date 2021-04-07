import React, { useState } from 'react';
import logo from '../images/logo.png';
import profile from '../images/blobfish.png';

import { history } from '../helpers/history';

import { NavLink } from "react-router-dom";

import { CompanyName, NavList, NavListItem } from '../css/Text';
import { LogoContainer, NavigationContainer, ProfileModaItem, ProfileModal, ProfilePhotoContainer } from '../css/Div';
import { DefaultLogo } from '../css/Logo';
import { ProfilePhoto } from '../css/Image';

function Navigation(props) {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const navigateToSettings = () => {
        history.push('/settings');
    }

    function logout(event) {
        // event.preventDefault();
        localStorage.removeItem('token');
        history.push('/');
    }

    return (
        <NavigationContainer>
            <LogoContainer>
                <DefaultLogo navigation src={logo} alt="Stonk Ponk Logo" />
                <CompanyName>Stonk Ponk</CompanyName>
            </LogoContainer>
            <NavList>
                <NavListItem><NavLink to="/market">Market</NavLink></NavListItem>
                <NavListItem><NavLink to="/portfolio">Portfolio</NavLink></NavListItem>
                <NavListItem><NavLink to="/watchlist">Watchlist</NavLink></NavListItem>
                <NavListItem><NavLink to="/news">News</NavLink></NavListItem>
                <NavListItem><NavLink to="/education">Education</NavLink></NavListItem>
            </NavList>
            <ProfilePhotoContainer>
                {!props.settings ?
                    <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" onClick={() => setProfileModalOpen(!profileModalOpen)} />
                    :
                    <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" style={{ border: "3px solid #9e22ff" }} onClick={() => setProfileModalOpen(!profileModalOpen)} />
                }
            </ProfilePhotoContainer>
            {profileModalOpen &&
                <ProfileModal>
                    <ProfilePhotoContainer>
                        <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" />
                    </ProfilePhotoContainer>
                    <h2>Bobfish The Blobfish</h2>
                    <ProfileModaItem className="profile-modal-item" onClick={navigateToSettings}>Settings</ProfileModaItem>
                    <ProfileModaItem className="profile-modal-item">Contact Us</ProfileModaItem>
                    <ProfileModaItem onClick={() => { logout() }} className="profile-modal-item">Logout</ProfileModaItem>
                </ProfileModal>
            }
        </NavigationContainer>
    )
}

export default Navigation;