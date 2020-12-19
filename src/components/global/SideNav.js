// The Side Navigation Bar present on all pages

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Link Import to replace a tags
import { Link } from 'react-router-dom';
// Importing all production Icons with code names
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// Importing Side Nav Data File
import { SideNavData } from './SideNavData';
// Importing IconContext to help systematically change colors
import { IconContext } from 'react-icons';

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
                        {/* Mapping through the data file */}
                        {/* Creating an li element with the 
                        object properties */}
                        {SideNavData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </NavMenuItems>
                </nav>
            </IconContext.Provider>
        </RootContainer>
    )
}

// Color Variables
const backgroundColor = "#060b26"
const itemColor = "#f5f5f5";
const hoverColor = "#1a83ff";

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
    .nav-text {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 16px;
        list-style: none;
        height: 60px;
        /* The actual links inside the li elements
        rendered by mapping */
        a {
            text-decoration: none;
            color: ${itemColor};
            font-size: 1.2rem;
            width: 95%;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 1.2rem;
            border-radius: 4px;
            &:hover {
                background-color: ${hoverColor};
            }
        }
    }
    /* Styling the menu toggle icons */
    .menu-bars {
        margin-left: 2rem;
        font-size: 2rem;
        background: none;
    }
    span {
        margin-left: 1rem;
        color: ${itemColor};
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