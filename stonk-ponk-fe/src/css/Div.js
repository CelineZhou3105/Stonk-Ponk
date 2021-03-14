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

function createFlexRowDiv(justifyContent, padding) {
    return styled.div`
        ${FlexRow};
        justify-content: ${justifyContent};
        align-items: center;
        padding: ${padding};
    `;
}

function createFlexColumnDiv(alignItem, margin) {
    return styled.div`
        ${FlexColumn};
        justify-content: center;
        align-items: ${alignItem};
        margin: ${margin};
    `;
}

export const FlexRowDiv = createFlexRowDiv("space-between", "auto");

export const SignUpItemDiv = createFlexColumnDiv("flex-start", "20px");

export const FlexColumnCenterDiv = createFlexColumnDiv("center", "50px");

export const LineDivider = styled.div`
    height: 1px;
    width: 40%;
    background-color: #bababa;
    margin: 10px;
`;

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
export const LogoContainer = createFlexRowDiv('center', '30px');

export const PasswordResetPageContainer = styled.div`
    ${FlexRow};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    width: 25%;
    height: auto;
    border-radius: 20px;
    padding: 30px;
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
    width: 40%;
    padding: 10px 0px;
`;


/* Navigation */
export const NavigationContainer = styled.div` 
    ${FlexRow}
    align-items: center;
    justify-content: space-between;
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
    width: 300px;
`;

export const ProfilePhotoContainer = styled.div`
    padding: 30px;
`;

export const ProfileModaItem = styled.div`
    padding: 30px 0;

    &:hover {
        background-color: #9f22ff3f;
        transition: background-color 1s;
    }
`;

/* Market Filters */
export const MarketFilterContainer = createFlexRowDiv('flex-end', '30px');