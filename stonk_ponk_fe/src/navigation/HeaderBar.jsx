import React from 'react';
import { Header } from '../css/Header';
import { HeaderLogo } from '../css/Logo';
import { CompanyName } from '../css/Text';
import logo from './logo.png';

const HeaderBar = () => {
    return (
        <Header>
            <HeaderLogo src={logo} alt="Stonk Ponk Logo" />
            <CompanyName>Stonk Ponk</CompanyName>
        </Header>
    );
};

export default HeaderBar;