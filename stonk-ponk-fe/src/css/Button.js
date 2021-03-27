import styled, { css } from 'styled-components';

export const ButtonStyle = css`
    cursor: pointer;
    border: none;
    border-radius: 10px;
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

export const EducationBox = styled.button`
    ${ButtonStyle}
    width: 250px;
    height: 250px;
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BackButton = styled.button`
    ${ButtonStyle}
    width: 5%;
    height: 50%;
    font-size: 13pt;
    background-color: #d6d6d6;
    &:hover {
        background-color: #c2c2c2;
    }
`;

export const PeriodButton = styled.button`
    cursor: pointer;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: Transparent;
    color: black;
    &:hover {
        background-color: #b55cfa;
    }
    &:select {
        color: #9e22ff;
    }
`;

export const SearchButton = styled.button`
    ${ButtonStyle}
    width: 5%;
    height: 35px;
    margin: 5px;
`;


export const GenericButton = styled.button`
    ${ButtonStyle}
    font-size: 18px;
    padding: 15px;
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

export const SaveButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #00AD30;
    color: white;
    font-size: 18px;
    padding: 15px;
    width: 15%;
    margin-top: 20px;
    transition: background-color 0.5s;

    &:hover {
        background-color: #2de361;
    }
`;

export const CancelButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #e80000;
    color: white;

    font-size: 18px;
    padding: 15px;
    width: 15%;
    margin-top: 20px;
    transition: background-color 0.5s;

    &:hover {
        background-color: #ff5757;
    }
`;

export const DeleteButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #e80000;
    color: white;
    font-size: 18px;
    padding: 15px;
    width: 15%;
    transition: background-color 0.5s;

    &:hover {
        background-color: #ff5757;
    }
`;

export const CloseButton = styled.span`
    color: #727272;
    float: right;
    font-size: 30px;
    font-weight: bold;

    &:hover, &:focus {
        color: #D8315E;
        text-decoration: none;
        cursor: pointer;
    }
`