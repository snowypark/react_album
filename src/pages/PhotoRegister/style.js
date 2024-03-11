import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 0px 20px 0px 20px;
    width: 100%;
    height: 90%;

    color: white;
`;

export const header = css `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%

`;

export const title = css`

    width: 100%;
    font-size: 18px;
    cursor: default;
`;

export const submitButton = css `
    border: none;
    font-size: 15px;
    font-weight: 700;
    background-color: transparent;
    color: white;
    cursor: pointer;

    &:hover {
        color: #a8e0ff;
    }
`;
export const container = css `

    display: flex;
    align-content: flex-start;
    flex-wrap: 100%;
    flex-grow: 1;
    width: 100%;
`;

export const imageBox = css `

    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    
    border: 1px solid #000000;
    width: 94px;
    height: 94px;
    background-color: white;

    overflow: hidden;
    cursor: pointer;

    &:hover {
        border: 2px solid #000000
    }

    &:activ {
        border: 3px solid #000000
    }

    & > img {
        height: 100%;
    }
`;

export const checkbox = css `
    display:none;

    & + label > div {
        display: none;
    }

    &:checked + label > div{ 

        display: flex;
        position: absolute;
        bottom : 5px;
        right : 5px;
        justify-content: center;
        align-items: center;        

        border: 1px solid #dbdbdb;
        width: 15px;
        height: 15px;
        border-radius:50%;
        background-color: white;
        
        font-size: 12px;
        font-weight:600;
        color:#222222;
        cursor: pointer;
    }

`;