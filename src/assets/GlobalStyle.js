// Some Global Styling across the website

import { createGlobalStyle } from 'styled-components';

// Color Variables
const mainBackground = "#0b1320";
const mainFontColor = "white";
const accentColor = "#fde00d";

const GlobalStyle = createGlobalStyle`
    * {
        /* Removing padding and margin from whole site */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        /* Background Color and Font for whole website */
        background: ${mainBackground};
        font-family: 'Inter', sans-serif;
        /* Prevents side-scrolling from any overflow */
        overflow-x: hidden;
    }
    h2 {
        font-size: 4rem;
        color: ${mainFontColor};
    }
    h4 {
        font-size: 2rem;
        color: ${mainFontColor};
        font-weight: lighter;
    }
    h5 {
        font-size: 1.6rem;
        color: ${mainFontColor};
        font-weight: lighter;
    }
    span {
        color: ${accentColor};
    }
    p {
        padding: 1.5rem 0rem;
        color: ${mainFontColor};
        font-size: 1.4rem;
    }
    button {
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid ${accentColor};
        border-radius: 1rem;
        background: transparent;
        color: ${mainFontColor};
        /* Adding a transition for hover */
        transition: all 0.5s ease;
        font-family: 'Inter', sans-serif;
        &:hover {
            background-color: ${accentColor};
            color: black;
        }
    }
`

export default GlobalStyle;