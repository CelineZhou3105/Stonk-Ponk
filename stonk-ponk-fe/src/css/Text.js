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
    padding: 1em 3em;
    display: inline-block;
    font-size: 18px;

    & > a:hover:after {
        width: 100%;
        left: 0;
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
    }

    & .active {
        border-bottom: 2px solid #9e22ff;
    }

    & .active:after {
        height: 0px;
    }
`;

/* Portfolio Page */
export const SubText = styled.p`
    color: ${ props => props.color ? props.color : '#7B7B7B' };
    font-size: 14px;
    display: ${props => props.inline ? 'inline ': 'block'};
`;

export const SubTitle = styled.p`
    font-size: 20px;
    margin: 1em auto;
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