// The list of navigation links for when a user is signed in

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing all production Icons with code names
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
// Link Component
import { Link } from 'react-router-dom';
// Importing Redux hooks and actions
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux-store/actions/AuthActions';

const SignedInLinks = () => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(signOutUser());
    }

    const emailCredential = useSelector((state) => state.firebase.auth.email);

    return (
        <ListContainer>
            <li>
                <span id="email-credential">{emailCredential}</span>
            </li>
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
                {/* Link: News Form Page */}
                {/* NOTE: News Form only visible when user(admin) is logged in */}
                <Link to='/create-news-announcement'>
                    <FaIcons.FaNewspaper />
                    <span>News Form</span>
                </Link>
            </li>
            <li>
                {/* Log out option to sign user out */}
                <a onClick={handleSignOut}>
                    <ImIcons.ImExit />
                    <span>Log Out</span>
                </a>
            </li>
        </ListContainer>
    )
}

// Color Variables
const itemColor = "#f5f5f5";
const nameColor = "#fde00d";
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
                cursor: pointer;
                background-color: ${hoverColor};
            }
        }
        span {
            margin-left: 1rem;
            color: ${itemColor};
        }
        #email-credential {
            color: ${nameColor};
        }
    }
`
export default SignedInLinks;