import React, { useState } from 'react';
import './navigation.css';
import logo from './logo.png';
import profile from './profile.png';

import {
    NavLink,
} from "react-router-dom";

function Navigation() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    return (
        <>
            <div className="navigation-container">
                <div className="brand">
                    <img src={logo} className="logo" alt="" />
                    <div className="title">Stonk Ponk</div>
                </div>
                <ul className="navigation-list">
                    <li><NavLink className="nav-item" to="/home">Summary</NavLink></li>
                    <li><NavLink className="nav-item" to="/education">Education</NavLink></li>
                    <li><NavLink className="nav-item" to="/portfolio">Portfolio</NavLink></li>
                    <li><NavLink className="nav-item" to="/market">Market</NavLink></li>
                    <li><NavLink className="nav-item" to="/watchlist">Watchlist</NavLink></li>
                </ul>
                <div className="profile-photo-container">
                    <img className="profile-photo" src={profile} alt="" onClick={() => setProfileModalOpen(!profileModalOpen)} />
                </div>
            </div>
            {profileModalOpen &&
                <div className="profile-modal">
                    <img className="profile-photo" src={profile} alt="" />
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