import styled, { css } from 'styled-components';

export const ButtonStyle = css`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #9e22ff;
    color: white;
`;

export const LoginButton = styled.button`
    ${ButtonStyle}
    font-size: 18pt;
    padding: 15px;
    width: 15%;
    margin-top: 20px;
`;