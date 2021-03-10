import styled, { css } from 'styled-components';

export const FlexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SignUpForm = styled.form`
    ${FlexCenter}
    flex-direction: column;
    margin-top: 2%;
    margin-bottom: 5%;
`;

export const Label = styled.label`
    margin-bottom: 5px;
`;

export const TextField = styled.input`
    border: none;
    border-bottom: 1px solid;
    font-size: 13pt;
    &:focus {
        border-bottom: 1px solid #9e22ff;
    }
`;

export const SignUpBtn = styled.input`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #9e22ff;
    color: white;
    font-size: 18pt;
    padding: 15px;
    width: 15%;
    margin: 20px;
    ${FlexCenter}
`;