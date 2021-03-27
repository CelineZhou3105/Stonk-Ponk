import styled, { css } from 'styled-components';

export const ButtonStyle = css`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #9e22ff;
    color: white;
    font-size: 16px;
    transition: background-color 500ms;
    &:hover {
        background-color: #b55cfa;
    }
`;

/* EditButton - for editing profile on the Settings Page */
export const EditButton = styled.button`
    ${ButtonStyle}
    padding: 15px;
    margin: 5px;
`;

/* Education Tile - for each button on the education page */
export const EducationTile = styled.button`
    ${ButtonStyle}
    width: 250px;
    height: 250px;
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

/* SearchButton - used to trigger the search functionality */
export const SearchButton = styled.button`
    ${ButtonStyle}
    font-size: 12px;
    width: 5%;
    height: 35px;
    margin: 5px;
`;

/* CloseButton - used on modals for closing the modal */
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
/* GenericButton - used on most pages, colours and hover colours customisable */
export const CustomButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#9e22ff'};
    color: ${props => props.color ? props.color: 'white'};
    padding: 15px;
    transition: background-color 0.5s;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: ${props => props.hoverColor ? props.hoverColor : '#b55cfa'};
    }
`;