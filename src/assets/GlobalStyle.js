// Some Global Styling across the website

import { createGlobalStyle } from 'styled-components';

// Color Variables
const mainBackground = "#F1FAEE";
const mainFontColor = "#1D3557";
const accentColor = "#E63946";

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
        /* Pushing body content down
        to make way for fixed navbar */
        position: relative;
        margin-top: 10vh;
    }
    h1 {
        font-size: 5rem;
        color: ${mainFontColor};
    }
    h2 {
        font-size: 4rem;
        color: ${mainFontColor};
    }
    h3 {
        font-size: 3rem;
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
    p {
        padding: 1.5rem 0rem;
        color: ${mainFontColor};
        font-size: 1.4rem;
    }
    span {
        color: ${accentColor};
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
            color: ${mainBackground};
        }
    }
    /* For Modals */
    
    /* Modal Transition */
    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .ReactModal__Overlay--after-open{
        opacity: 1;
    }
    .ReactModal__Overlay--before-close{
        opacity: 0;
    }
`

export default GlobalStyle;