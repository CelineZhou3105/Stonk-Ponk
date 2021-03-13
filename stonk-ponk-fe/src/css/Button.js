import styled, { css } from 'styled-components';

export const ButtonStyle = css`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #9e22ff;
    color: white;
    &:hover {
        background-color: #b55cfa;
    }
`;

export const LoginButton = styled.button`
    ${ButtonStyle}
    font-size: 18pt;
    padding: 15px;
    width: 15%;
    margin-top: 20px;
`;

export const EditButton = styled.button`
    ${ButtonStyle}
    font-size: 12pt;
    padding: 15px;
    margin: 5px;
`;