import styled from 'styled-components';

export const BlueLinkText = styled.span`
    color: #44BCFF;
`;

export const GreyText = styled.p`
    color: #bababa;
`;

export const TitleItalicText = styled.h1`
    font-style: italic;
    font-size: 30pt;
`;

export const CompanyName = styled.p`
    font-size: 20pt;
`;

export const PurpleItalicText = styled.h2`
    color: #9e22ff;
    font-style: italic;
`;

export const LinkText = styled.a`
    color: #44BCFF;
    text-decoration: none;
`;

/* Navigation Bar */
export const NavList = styled.ul`
    padding: 0; 
`;


export const NavListItem = styled.li`
    position: relative; 
    padding: 20px 60px;
    display: inline-block;
    font-size: 20pt;

    & > a:hover:after {
        width: 100%;
        left: 0;
        top: 15px;
    }

    & > a {
        text-decoration: none;
        color: #000000;
    }

    & > a:after {
        background: none repeat scroll 0 0 #9e22ff;
        bottom: 0;
        content: "";
        display: block;
        height: 2px;
        left: 50%;
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
        position: relative;
        width: 0;
        top: 15px;
    }

    & .active {
        border-bottom: 2px solid #9e22ff;
    }

    &. active:after {
        height: 0;
    }
`;
