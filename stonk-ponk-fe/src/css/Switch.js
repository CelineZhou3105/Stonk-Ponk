import styled, { css } from 'styled-components';

export const SwitchCSS = css`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const Switch = styled.label`
    position: relative;
    width: 20%;
    height: 10%;
    ${SwitchCSS}
`;

export const CheckBox = styled.input`
    ${SwitchCSS}

    &:checked {
        background-color: #2196F3;
    }

    &:focused {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
`;