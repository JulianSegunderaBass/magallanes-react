// Page for displaying profile information + benefits

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
// Redux Imports
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const auth = useSelector((state) => state.firebase.auth);
    const profileData = useSelector((state) => state.firebase.profile);
    return (
        <ProfileContainer
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            <h2>Name: {profileData.firstName} {profileData.lastName}</h2>
            <h2>Email: {auth.email}</h2>
            <h2>My Benefits: </h2>
            <ul>
                <li>{profileData.currentBenefits.benefit_1}</li>
                <li>{profileData.currentBenefits.benefit_2}</li>
                <li>{profileData.currentBenefits.benefit_3}</li>
            </ul>
        </ProfileContainer>
    )
}

// Styled Components

const ProfileContainer = styled(motion.div)`
    min-height: 90vh;
`

export default ProfilePage;