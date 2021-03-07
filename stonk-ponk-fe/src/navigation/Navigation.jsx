import React, { useState } from 'react';
import './navigation.css';
import logo from './atlassian.png';
import profile from './profile.png';

function Navigation() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    return (
        <>
            <div className="navigation-container">
                <img src={logo} className="logo" alt=""/>
                <div className="title">Stonk Ponk</div>
                <ul className="navigation-list">
                    <li><a className="nav-item" href="https://google.com">Summary</a></li>
                    <li><a className="nav-item" href="https://google.com">Education</a></li>
                    <li><a className="nav-item" href="https://google.com">Portfolio</a></li>
                    <li><a className="nav-item" href="https://google.com">Market</a></li>
                    <li><a className="nav-item" href="https://google.com">Watchlist</a></li>
                </ul>
                <div className="profile-photo-container">
                    <img className="profile-photo" src={profile} alt="" onClick={() => setProfileModalOpen(!profileModalOpen)}/>
                </div>
            </div>
            {profileModalOpen && 
                <div className="profile-modal">
                    <img className="profile-photo" src={profile} alt=""/>
                    <h2>Samantha Anders</h2>
                    <div className="profile-modal-item">Settings</div>
                    <div className="profile-modal-item">Contact Us</div>
                    <div className="profile-modal-item">Logout</div>
                </div>
            }
        </>
    )
}

export default Navigation;