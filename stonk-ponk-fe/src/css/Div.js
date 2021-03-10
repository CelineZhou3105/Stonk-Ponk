import styled, { css } from 'styled-components';

export const FlexRow = css`
    display: flex;
`;

function createFlexRowDiv(justifyContent) {
    return styled.div`
        ${FlexRow};
        justify-content: ${justifyContent};
        align-content: center;
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