import styled from 'styled-components';


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

    @media (max-width: 1280px) {
        display: none;
    }
`;

export const CollapsedNavList = styled.ul`
    padding: 0; 

    & > a {
        text-decoration: none;
    }
`;


export const NavListItem = styled.li`
    position: relative;
    padding: 1em 3em;
    display: inline-block;
    font-size: 18px;

    & > a:hover:after {
        width: 100%;
        left: 0;
    }

    & > a {
        text-decoration: none;
        color: #FFF;
    }

    & > a:after {
        background: none repeat scroll 0 0 #FFF;
        bottom: 0;
        content: "";
        display: block;
        height: 2px;
        left: 50%;
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
        position: relative;
        width: 0;
    }

    & .active {
        border-bottom: 2px solid #FFF;
    }

    & .active:after {
        height: 0px;
    }

    @media (max-width: 500px) {
        padding: 0.5em;
    }
`;

export const CollapsedNavItem = styled.li`
    display: block;
    padding: 20px;
    color: #FFF;

    &:hover {
        background-color: #c869ff;
    }
`;

/* Portfolio Page */
export const SubText = styled.p`
    color: ${ props => props.color ? props.color : '#7B7B7B' };
    font-size: 14px;
    display: ${props => props.inline ? 'inline ': 'block'};
    margin: ${props => props.margin ? props.margin : ''};
`;

export const PortfolioHealthText = styled.p`
    color: '#7B7B7B';
    font-size: 14px;
    margin: 0;
`;

export const SubTitle = styled.p`
    font-size: 20px;
    margin: 1em auto;

    @media (max-width: 800px) {
        margin: 0;
    }
`;

export const PortfolioValue = styled.p`
    font-size: 48px;
    margin-bottom: 0;
    margin-top: 0.3em;
`;

export const PageTitle = styled.p`
    font-size: 36px;
`

export const NormalText = styled.p`
    font-size: 16px;
    margin-bottom: 0;
    margin-top: 0;
`;

export const ColorText = styled.span`
    color: ${props=> props.color ? props.color : '#000000'};
`;

export const Link = styled.a`
    color: ${props => props.color ? props.color : '#7B7B7B'};

    &:hover {
        color: #44BCFF;
    }
`;