// The list of navigation links for when a user is signed in

// Functional Imports
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../redux-store/actions/AuthActions";
// Component Imports
import { Link } from "react-router-dom";
// Icon Imports
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as Ionicons from "react-icons/io";
// Styling + Animation Imports
import styled from "styled-components";

const SignedInLinks = () => {

  const dispatch = useDispatch();

  // Selecting Redux State
  const profileData = useSelector((state) => state.firebase.profile);
  const emailCredential = useSelector((state) => state.firebase.auth.email);
  
  // Functions
  const handleSignOut = () => {
    dispatch(signOutUser());
  };
  
  return (
    <ListContainer>
      <li>
        <div className="credential-container">
          <span className="credential" id="user-name">
            {profileData.firstName} {profileData.lastName}
          </span>
          <span className="credential">{emailCredential}</span>
        </div>
      </li>
      {/* Each li below is a nav element */}
      <li>
        {/* Link: Home Page */}
        <Link to="/">
          <AiIcons.AiFillHome />
          <span>Home</span>
        </Link>
      </li>
      <li>
        {/* Link: FAQ Page */}
        <Link to="/faq">
          <AiIcons.AiOutlineQuestionCircle />
          <span>FAQ</span>
        </Link>
      </li>
      <li>
        {/* Link: News Reports Page */}
        <Link to="/news">
          <AiIcons.AiOutlineAlert />
          <span>News Reports</span>
        </Link>
      </li>
      <li>
        <Link to="/brgyforms">
          <Ionicons.IoIosPaper />
          <span>Registration Forms</span>
        </Link>
      </li>
      <li>
        {/* Link: Profile Page */}
        {/* NOTE: Profile Page only visible when user is logged in */}
        <Link to="/my-profile">
          <MdIcons.MdPerson />
          <span>My Profile</span>
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
  );
};

// Styled Components + Color Variables
const itemColor = "#F1FAEE";
const credentialColor = "#F1FAEE";
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
    .credential-container {
      .credential {
        color: ${credentialColor};
        display: block;
        margin-bottom: 0.5rem;
        margin-left: 0rem;
      }
      #user-name {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
`

export default SignedInLinks;
