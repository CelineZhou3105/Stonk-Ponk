import styled, { css } from 'styled-components';

export const FlexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FlexRow = css`
    display: flex;
`;

function createFlexRowDiv(justifyContent, padding) {
    return styled.div`
        ${FlexRow};
        justify-content: ${justifyContent};
        align-content: center;
        padding: ${padding};
    `;
}

export const FlexRowDiv = createFlexRowDiv("space-between");

export const FlexColumn = css`
    display: flex;
    flex-direction: column;
`;

function createFlexColumnDiv(alignItem, margin) {
    return styled.div`
        ${FlexColumn};
        justify-content: center;
        align-items: ${alignItem};
        margin: ${margin};
    `;
}

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
    position: absolute;
    z-index: -10;
    top: 0;
    width: 100%;
    height: 100%;
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
    text-align: center;
`;

/* Password Reset Page */
export const PasswordResetBackground = styled.div`
    ${FlexCenter}
    flex-direction: column;
    background-color: white;
    box-shadow: 10px 10px rgba(0, 0, 0, 0.5);
`;