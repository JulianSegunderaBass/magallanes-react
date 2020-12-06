// Some Global Styling across the website

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        /* Removing padding and margin from whole site */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        /* Background Color and Font for whole website */
        background: #0b1320;
        font-family: 'Inter', sans-serif;
        /* Prevents side-scrolling from any overflow */
        overflow-x: hidden;
    }
    h2 {
        font-size: 4rem;
        color: white;
    }
    h4 {
        font-size: 2rem;
        color: white;
        font-weight: lighter;
    }
    h5 {
        font-size: 1.6rem;
        color: white;
        font-weight: lighter;
    }
    span {
        color: #fde00d;
    }
    p {
        padding: 1.5rem 0rem;
        color: white;
        font-size: 1.4rem;
    }
    button {
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid #fde00d;
        border-radius: 1rem;
        background: transparent;
        color: white;
        /* Adding a transition for hover */
        transition: all 0.5s ease;
        font-family: 'Inter', sans-serif;
        &:hover {
            background-color: #fde00d;
            color: black;
        }
    }
`

export default GlobalStyle;