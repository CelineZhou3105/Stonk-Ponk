import styled from 'styled-components';

export const HeaderLogo = styled.img`
    width: 70px;
    height: 70px;
    margin-left: 20px;
    margin-right: 15px;
`;

export const DefaultLogo = styled.img`
    height: auto;
    width: ${props => props.navigation ? "120px" : "25%"};
    padding-right: ${props => props.navigation ? "30px" : "auto"};
    border-radius: 50%;
`;

