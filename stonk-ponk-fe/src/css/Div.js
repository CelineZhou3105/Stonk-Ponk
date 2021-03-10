import styled, { css } from 'styled-components';

export const FlexRow = css`
    display: flex;
`;

function createFlexRowDiv(justifyContent) {
    return styled.div`
        ${FlexRow};
        justify-content: ${justifyContent};
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
        align-items: ${alignItem};
        margin: ${margin};
    `;
}

export const SignUpItemDiv = createFlexColumnDiv("flex-start", "20px");

export const LineDivider = styled.div`
    height: 1px;
    width: 40%;
    background-color: #bababa;
    margin: 10px;
`;