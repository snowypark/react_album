import { css } from "@emotion/react";

export const layout = css`
    padding: 0px 10px;

`;

export const imageCard = css`
    box-sizing: border-box;
    margin-bottom: 2px;
    border: 1px solid #151515;
    background-color: #151515;
 `;
    
export const imageBox = css`

    flex: content;
    align-content: flex-start;
    background-color: #000000;
    overflow: hidden;        

    border: 1px solid #000000;
    background-color: white;
    

    & > img {
        width: 100%;
    }
`;


