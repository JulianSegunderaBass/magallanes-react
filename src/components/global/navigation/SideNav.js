// The Side Navigation Bar present on all pages

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing all production Icons with code names
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// Importing IconContext to help systematically change colors
import { IconContext } from 'react-icons';
// Link Import to replace a tags
import { Link } from 'react-router-dom';
// Importing conditional links
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const SideNav = () => {

    // State and Function to display side navigation menu
    const [sideNav, setSideNav] = useState(false);

    const showSideNav = () => {
        setSideNav(!sideNav);
    }

    return (
        <RootContainer>
            {/* Context provider helps set colors for all icons */}
            <IconContext.Provider value={{color: '#fff'}}>
                <NavBar>
                    {/* onClick event to toggle state and side bar */}
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideNav} />
                    </Link>
                </NavBar>
                {/* Nav classes are applied depending on the state */}
                <nav className={sideNav ? 'nav-menu active' : 'nav-menu'}>
                    {/* Whenever you click a nav menu item,
                    nav closes */}
                    <NavMenuItems onClick={showSideNav}>
                        <NavToggle>
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </NavToggle>
                        {/* Conditionally rendering the right set of navigation options
                        depending on user auth status */}
                        <SignedInLinks />
                        <SignedOutLinks />
                    </NavMenuItems>
                </nav>
            </IconContext.Provider>
        </RootContainer>
    )
}

// Color Variables
const backgroundColor = "#060b26"

// Styled Components

// The Root Container of the whole component
const RootContainer = styled.div`
    .nav-menu {
        background-color: ${backgroundColor};
        width: 17rem;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        /* Hiding the menu when inactive */
        left: -100%;
        transition: 850ms;
    }
    .nav-menu.active {
        /* When the menu comes into view */
        left: 0;
        transition: 350ms;
    }
    /* Styling the menu toggle icons */
    .menu-bars {
        margin-left: 2rem;
        font-size: 2rem;
        background: none;
    }
`

const NavBar = styled.div`
    background-color: ${backgroundColor};
    min-height: 10vh;
    display: flex;
    justify-content: start;
    align-items: center;
`

// The ul holding the nav items
const NavMenuItems = styled.ul`
    width: 100%;
`

const NavToggle = styled.li`
    background-color: ${backgroundColor};
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
`

export default SideNav;