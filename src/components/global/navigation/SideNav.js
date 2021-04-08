// The Side Navigation Bar present on all pages

// Functional Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Component Imports
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import AdminLinks from './AdminLinks';
// Data + Image Imports
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
// Styling + Animation Imports
import styled from 'styled-components';

const SideNav = () => {

    // Selecting Redux State
    const auth = useSelector((state) => state.firebase.auth);
    
    // Local State
    const [sideNav, setSideNav] = useState(false); // State to display side navigation menu
    
    // Functions
    const showSideNav = () => {
        setSideNav(!sideNav);
    }

    // Conditions
    const links = auth.uid ? 
        auth.email === process.env.REACT_APP_ADMIN_EMAIL_IDENTIFIER ? <AdminLinks /> : <SignedInLinks />
        : <SignedOutLinks />
    ; // Determining links to display based on auth status

    return (
        <RootContainer>
            {/* Context provider helps set colors for all icons */}
            <IconContext.Provider value={{color: '#F1FAEE'}}>
                <NavBar>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideNav} />
                    </Link>
                </NavBar>
                <nav className={sideNav ? 'nav-menu active' : 'nav-menu'}>
                    <NavMenuItems onClick={showSideNav}>
                        <NavToggle>
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </NavToggle>
                        {/* auth.isLoaded makes sure the data is loaded
                        before making the decision */}
                        {auth.isLoaded && links}
                    </NavMenuItems>
                </nav>
            </IconContext.Provider>
        </RootContainer>
    )
}

// Styled Components + Color Variables
const backgroundColor = "#031926"

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
    /* Fixed for scrolling */
    position: fixed;
    width: 100%;
    top: 0;
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