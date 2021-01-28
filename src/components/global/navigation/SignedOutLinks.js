// The list of navigation links for when an admin is NOT signed in
// These links assume the reader is just a regular viewer

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing all production Icons with code names
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// Link Component
import { Link } from 'react-router-dom';


const SignedOutLinks = () => {
    return (
        <ListContainer>
            {/* Each li below is a nav element */}
            <li>
                {/* Link: Home Page */}
                <Link to='/'>
                    <AiIcons.AiFillHome />
                    <span>Home</span>
                </Link>
            </li>
            <li>
                {/* Link: FAQ Page */}
                <Link to='/faq'>
                    <AiIcons.AiOutlineQuestionCircle />
                    <span>FAQ</span>
                </Link>
            </li>
            <li>
                {/* Link: News Reports Page */}
                <Link to='/news'>
                    <AiIcons.AiOutlineAlert />
                    <span>News Reports</span>
                </Link>
            </li>
        </ListContainer>
    )
}

// Color Variables
const itemColor = "#f5f5f5";
const hoverColor = "#1a83ff";

// Styled Components
const ListContainer = styled.div`
    li {
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
        span {
            margin-left: 1rem;
            color: ${itemColor};
        }
    }
`
export default SignedOutLinks;