import styled from 'styled-components';

export const HeaderLogo = styled.img`
    width: 70px;
    height: 70px;
    margin-left: 20px;
    margin-right: 15px;
`;

export const DefaultLogo = styled.img`
    height: auto;
    width: ${props => props.width ? props.width : "100px"};
    padding: ${props => props.padding ? props.padding : "0px"};
    margin-right: ${props => props.navigation ? "30px" : "0"};
    border-radius: 50%;
    margin-left: 10px;
`;

