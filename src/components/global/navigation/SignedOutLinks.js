// The list of navigation links for when a user is NOT signed in
// These links assume the reader is just a regular viewer with no account

// Functional Imports
import React from 'react';
// Component Imports
import { Link } from 'react-router-dom';
// Data + Image Imports
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
// Styling + Animation Imports
import styled from 'styled-components';

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
            <li>
                {/* Link: Sign In Page */}
                <Link to='/sign-in'>
                    <MdIcons.MdPerson />
                    <span>Sign In</span>
                </Link>
            </li>
        </ListContainer>
    )
}

// Styled Components + Color Variables
const itemColor = "#F1FAEE";
const hoverBackgroundColor = "#A8DADC";
const hoverItemColor = "#031926";

const ListContainer = styled.div`
    li {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 16px;
        list-style: none;
        height: 60px;
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
                cursor: pointer;
                background-color: ${hoverBackgroundColor};
                span {
                    color: ${hoverItemColor};
                    font-weight: bold;
                }
            }
        }
        span {
            margin-left: 1rem;
            color: ${itemColor};
        }
    }
`
export default SignedOutLinks;