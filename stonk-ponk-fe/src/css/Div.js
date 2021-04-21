import styled, { css } from 'styled-components';

export const FlexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FlexRow = css`
    display: flex;
`;

export const FlexColumn = css`
    display: flex;
    flex-direction: column;
`;

function createFlexRowDiv(justifyContent, margin, padding) {
    return styled.div`
        ${FlexRow};
        justify-content: ${justifyContent};
        align-items: center;
        margin: ${margin};
        padding: ${padding};
    `;
}

function createFlexColumnDiv(justifyContent, alignItem, margin) {
    return styled.div`
        ${FlexColumn};
        justify-content: ${justifyContent};
        align-items: ${alignItem};
        margin: ${margin};
    `;
}

export const FlexRowDiv = createFlexRowDiv("space-between", "auto", "auto");

export const FlexRowLeftDiv = createFlexRowDiv("flex-start", "auto", "auto");

export const SettingRowDiv = createFlexRowDiv("space-between", "10px", "10px");

export const SettingEditRowDiv = createFlexRowDiv("space-between", "0", "auto");
export const FlexRowEndDiv = createFlexRowDiv("flex-end", "auto", "auto");

export const SettingFieldDiv = styled.div`
    ${FlexRow};
    width: 1000px;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    padding: 10px;
`;

export const SettingModalDiv = styled.div`
    ${FlexColumn}
    justify-content: center;
    align-items: flex-start;
    width: 60%;
    font-weight: bold;
`;

export const SignUpSectionDiv = styled.div`
    display: flex;
    flex-direction: ${props => props.row ? "row" : "column"};
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: ${props => props.gap ? props.gap : "0"};
`;

export const FlexColumnCenterDiv = createFlexColumnDiv("center", "center", "50px");

export const FlexColumnLeftDiv = createFlexColumnDiv("center", "flex-start", "10px");

export const ProfilePictureContainer = styled.div`
    ${FlexColumn}
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function createLineDivider(width) {
    return styled.div`
        height: 1px;
        width: ${width};
        background-color: #7B7B7B;
        margin: 10px;
    `;
}
export const LineDivider = createLineDivider("100%");

/* Particles.js */
export const ParticleContainer = styled.div`
    background-color: #401363;
    position: ${props => props.login ? "relative" : "absolute"};
    z-index: ${props => props.login ? "auto" : "-10"};
    width: 100%;
    height: 100%;
    flex: ${props => props.login ? "3" : "0"};
`;

/* Password Reset Page */
export const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center; 
    margin: 0;
    align-items: center;

    @media (max-width: 500px) {
        order: 1;
    }
`;

export const PasswordResetPageContainer = styled.div`
    ${FlexRow};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const SignUpPageContainer = styled.div`
    width: 100%;
    height: 100%;
    /* ${FlexRow};
    justify-content: center;
    align-items: center; */
`;
export const FormContainer = styled.div`
    width: 100%;
    text-align: center;
`;
export const PasswordResetBackground = styled.div`
    ${FlexCenter}
    flex-direction: column;
    background-color: white;
    box-shadow: 10px 10px rgba(0, 0, 0, 0.5);
    width: 50%;
    height: auto;
    border-radius: 20px;
    padding: 30px;
    margin: 50px auto;
`;

/* Login Page */
export const LoginPageContainer = styled.div` 
    ${FlexRow}
    height: 100%;
    width: 100%;
    align-items: center;
`;

export const LoginFormContainer = styled.div` 
    ${FlexColumn}
    flex: 2;
    text-align: center;
`;

export const LinkContainer = styled.div`
    display: flex;
    justify-content: ${props => {
        if (props.left) {
            return "flex-start"
        } else if (props.right) {
            return "flex-end"
        } else {
            return "center"
        }
    }};
    align-items: center;
    width: 100%;
    padding: 10px 0px;
`;


/* Navigation */
export const NavigationContainer = styled.div` 
    ${FlexRow}
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.0975);
    background-color: #af28ff;
    color: white;
    box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
`;

export const ProfileModal = styled.div`
    text-align: center;
    float:right;
    border: grey solid 1px;
    border-radius: 10px;
    position: absolute;
    top: 120px;
    right: 50px;
    background: white;
    color: #000;
    width: 300px;
    z-index: 9999;
`;

export const ProfilePhotoContainer = styled.div`
    padding: 30px;

    @media (max-width: 500px) {
        order: 2;
    }
`;

export const ProfileModaItem = styled.div`
    padding: 30px 0;
    cursor: pointer;

    &:hover {
        background-color: #9f22ff3f;
        transition: background-color 1s;
    }
`;

export const MenuContainer = styled.div`
    display: none;
    flex-direction: column;
    justify-content: left;
    width: 100px;
    background-color: #af28ff;
    z-index: 9999;
    @media (max-width: 1280px) {
        display: flex;
    }
`;

export const SideBar = styled.div`
    height: 100%; 
    width: ${props => props.open ? '250px' : 0}; 
    position: fixed; 
    z-index: 1; 
    right: 0; 
    top: 0;
    background-color: #af28ff; 
    overflow-x: hidden; 
    padding-top: 60px;
    transition: 0.5s; 
    box-shadow: -4px -4px 4px rgba(0,0,0,0.2);
`;

export const PhotoMenuContainer = styled.div`
    display: flex;
    align-items: center;
`;

/* Market Filters */
export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin: 30px;
    gap: 1em;
`


/* Stock Details Page*/
export const ChartContainer = createFlexRowDiv('space-evenly', '30px');
export const StockDetailsContainer = createFlexColumnDiv('center', 'center', '100px');
export const GraphAndPeriodDiv = createFlexColumnDiv("center", "center", "10px");

/* Portfolio Page */
export const Container = styled.div`
    background: rgba(158, 34, 255, 0.02);
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    flex-direction: ${props => props.flex_direction ? props.flex_direction : "row"};
    flex: 1;
    margin-top: 1em;
    margin-bottom: 1em;
    box-shadow: 4px 4px 4px rgba(108, 108, 108, 0.25);
    padding: 0.5em 1em;
    justify-content: ${props => props.justify_content ? props.justify_content : "flex-start"};
    gap: ${props => props.gap ? props.gap : 0};
    align-items: ${props => props.align_items ? props.align_items : 'flex-start'};

    @media (max-width: 800px) {
        flex-direction: column;
        padding: 1em;
    }
`;

export const PortfolioValueContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 800px) {
        align-items: flex-start;
    }
`;

export const PortfolioHealthContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 2em;
    width: 100%;
`;
export const PageContainer = styled.div` 
    margin: 3em;
`;

export const SectionRowDiv = styled.div`
    ${FlexRow}
    gap: 1em;

    @media (max-width: 700px) {
        flex-direction: column;
        gap: 0em;
    }
`;

export const RightAlignedButtonContainer = styled.div` 
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
`;

/* Create Modal */
export const ModalContainer = styled.div` 
    position: fixed;
    z-index: 1; 
    padding-top: 100px; 
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; 
    background-color: rgba(0,0,0,0.4);
`

export const ModalContent = styled.div` 
    background-color: #e7e7e7;
    margin: auto;
    padding: 40px;
    width: 40%;
    border-radius: 20px;
    line-height: 1.5;
    height: ${props => props.height ? props.height : ''};
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none; 
        background: none;
        width: 10px;
    }

    &::-webkit-scrollbar-thumb { 
        background: grey;
        border-radius: 20px;
    }

    &::-webkit-scrollbar-track-piece { 
        border-radius: 20px;
    }
`;

export const NewsContainer = styled.div`
    display:flex;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid #7B7B7B;
    margin-bottom: 0.5em;
    width: 100%;
`

export const NewsTitleContainer = styled.div`
    ${FlexRow}
    gap: 1em;
    align-items: center;
`;

export const WatchlistTable = styled.div`
    width: 98%;
`;

/* Education page elements */
export const EducationTileGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
    margin-left: 20%;
    margin-right: 20%;
    @media (max-width: 850px) {
        grid-template-columns: repeat(2, 1fr); 
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr; 
    }
`;

export const GlossaryContainer = styled.div`
    padding: 2em 0;
`;

/* Portfolio What if I buy now Container */
export const LeftButtonContainer = styled.div`
    display: flex;
    gap: 1em;
    position: relative;
    top: 55px;
    width: min-content;

    @media (max-width: 960px) {
        position: static;
        justify-content: flex-end;
        width: 100%;
        padding-bottom: 1em;
    }
`;

export const ModalStocksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: flex-start;
    padding: 1em 0;
`;

export const StockDetailTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const AdminContainer = styled.div`
    ${FlexColumn}
    justify-content: center;
    align-items: flex-start;
`;

export const AdminControlsContainer = styled.div`
    ${FlexRow}
    justify-content: space-between;
    align-items: center;
`;

