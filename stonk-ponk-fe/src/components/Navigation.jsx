import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import profile from '../images/blobfish.png';

import { history } from '../helpers/history';

import { NavLink } from "react-router-dom";

import { CompanyName, NavList, NavListItem } from '../css/Text';
import { LogoContainer, NavigationContainer, ProfileModaItem, ProfileModal, ProfilePhotoContainer } from '../css/Div';
import { DefaultLogo } from '../css/Logo';
import { ProfilePhoto } from '../css/Image';
import { settings } from '../services/settings';


function Navigation(props) {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigateToSettings = () => {
        history.push('/settings');
    }

    function logout(event) {
        // event.preventDefault();
        localStorage.removeItem('token');
        history.push('/');
    }

    useEffect(() => {
        settings.getUser()
            .then(response => response.json())
            .then(json => {
                setFirstName(json.first_name);
                setLastName(json.last_name);
            })
            .catch((error) => {
                Promise.resolve(error)
                    .then((error) => {
                        alert(`${error.status} ${error.statusText}`);
                    });
            })
    }, []);

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
                    <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" style={{ border: "3px solid white" }} onClick={() => setProfileModalOpen(!profileModalOpen)} />
                }
            </ProfilePhotoContainer>

            {profileModalOpen &&
                <ProfileModal>
                    <ProfilePhotoContainer>
                        <ProfilePhoto className="profile-photo" src={profile} alt="Your profile picture" />
                    </ProfilePhotoContainer>
                    <h2>{firstName} {lastName}</h2>
                    <ProfileModaItem className="profile-modal-item" onClick={navigateToSettings}>Settings</ProfileModaItem>
                    <ProfileModaItem className="profile-modal-item">Contact Us</ProfileModaItem>
                    <ProfileModaItem onClick={() => { logout() }} className="profile-modal-item">Logout</ProfileModaItem>
                </ProfileModal>
            }
        </NavigationContainer>
    )
}

export default Navigation;