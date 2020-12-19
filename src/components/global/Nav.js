// The Navigation Bar present on all pages
// NOTE: This is the OLD component version of the nav.
// This was replaced with the "SideNav.js" component.
// Kindly avoid from deleting this file in case it is needed later.

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Link Import to replace a tags
import { Link } from 'react-router-dom';
// Importing Framer Motion
import { motion } from 'framer-motion';
// Importing useLocation to check current location
import { useLocation } from 'react-router-dom';

const Nav = () => {
    return (
        <StyledNav>
            {/* Brand link as the logo */}
            <h1><Link to="/" id="logo">Barangay Magallanes</Link></h1>
            {/* List of Link Elements */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li>
                    <Link to="#">News Reports</Link>
                </li>
                <li>
                    <Link to="#">Service Offerings</Link>
                </li>
            </ul>
        </StyledNav>
    )
}

// Styled Components

// Color variables
const navBackground = "black";
const hoverColor = "#fde00d";
const linkColor = "white";

const StyledNav = styled.nav`
    min-height: 10vh;
    display: flex;
    margin: auto;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 5rem;
    background: ${navBackground};
    position: sticky;
    top: 0;
    z-index: 5;
    #logo {
        font-size: 1.5rem;
        font-family: 'Lobster', cursive;
        font-weight: lighter;
        letter-spacing: 1px;
    }
    a {
        color: ${linkColor};
        text-decoration: none;
        transition: color ease 0.3s;
        &:hover {
            color: ${hoverColor};
        }
    }
    ul {
        display: flex;
        list-style: none;
    }
    li {
       padding-left: 2rem;
       /* For line animations */
       position: relative;
    }
    @media (max-width: 870px) {
        flex-direction: column;
        ul {
            padding-top: 1rem;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            li {
                padding: 0.5rem 0rem;
            }
        }
    }
    @media (max-width: 660px) {
        padding: 1rem 1rem;
        #logo {
            /* Inline block is needed so padding/margin
            can be applied to the a tag, which by default is inline */
            display: inline-block;
            margin: 1rem;
        }
        ul {
            /* Column so nav elements are stacked vertically */
            flex-direction: column;
            padding: 0.5rem;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            li {
                padding: 0.5rem 0rem;
            }
        }
    }
`


export default Nav;