// Page for displaying profile information + benefits

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad, revealUp } from '../assets/Animations';
// Importing AutoScroll function
import AutoScroll from '../assets/AutoScroll';
// Redux Imports
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetPass } from '../redux-store/actions/AuthActions';
// Importing Redirect Component
import { Redirect } from 'react-router-dom';

const ProfilePage = () => {
    const auth = useSelector((state) => state.firebase.auth);
    const profileData = useSelector((state) => state.firebase.profile);
    const dispatch = useDispatch();

    const handlePassReset = () => {
        dispatch(resetPass());
    }

    // If an authentication UID is NOT present (user is not signed in),
    // redirect to home
    if (!auth.uid) {
        return <Redirect to='/' />;
    }

    return (
        <ProfileContainer
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <h2><span>Name:</span> {profileData.firstName} {profileData.lastName}</h2>
            <h4><span>Email:</span> <span id="email">{auth.email}</span></h4>
            <div className="divider"></div>
            <h4><span>My Benefits:</span> </h4>
            <ul>
                <li>{profileData.currentBenefits.benefit_1}</li>
                <li>{profileData.currentBenefits.benefit_2}</li>
                <li>{profileData.currentBenefits.benefit_3}</li>
            </ul>
            <div className="divider"></div>
            <h5>You may reset your password here. A message will be sent to your inbox with further instructions.</h5>
            <button onClick={handlePassReset}>Change Password</button>
        </ProfileContainer>
    )
}

// Color Variables
const mainFontColor = "#1D3557";
const dividerColor = "#1D3557";

// Styled Components

const ProfileContainer = styled(motion.div)`
    min-height: 90vh;
    padding: 5rem 10rem;
    h2, h4, h5 {
        margin-bottom: 1rem;
    }
    ul {
        margin-top: 2rem;
        margin-bottom: 1rem;
        padding: 0 3rem;
        li {
            font-size: 1.8rem;
            color: ${mainFontColor};
        }
    }
    #email {
        color: ${mainFontColor};
    }
    .divider {
        width: 100%;
        height: 0.3rem;
        background: ${dividerColor};
        margin-bottom: 3rem;
    }
    @media (max-width: 1090px) {
        padding: 2rem 2rem;
    }
    @media (max-width: 700px) {
        h2 {
            font-size: 2rem;
        }
        li {
            font-size: 1.5rem
        }
        #email {
            color: ${mainFontColor};
            font-size: 1.2rem;
        }
        button {
            display: block;
            margin: 0 auto;
        }
    }
`

export default ProfilePage;