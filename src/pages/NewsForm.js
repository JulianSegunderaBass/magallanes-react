// Page for creating a news announcement and sending data to Firebase Firestore

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../assets/Animations';
// Redux Imports
import { useDispatch } from 'react-redux';

const NewsForm = () => {
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2>News Announcement <span>Form</span></h2>
                    <p>The News Information Page will update with your post</p>
                </TextSection>
            </Hide>
            <FormSection>
                <form>
                    <input type="text" placeholder="Enter your news headline here" />
                    <textarea rows="10" cols="50" placeholder="Enter your news content here" />
                </form>
            </FormSection>
        </MainContainer>
    )
}

// Styled Components

const MainContainer = styled(motion.div)`
    min-height: 90vh;
    padding: 5rem 10rem;
    display: flex;
    @media (max-width: 1500px) {
        flex-direction: column;
    }
`

const Hide = styled.div`
    height: 45vh;
    overflow: hidden;
    @media (max-width: 1500px) {
        height: 20vh;
    }
`

const TextSection = styled(motion.div)`
    padding-right: 5rem;
`

const FormSection = styled.div`
    form {
        input, textarea {
            display: block;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            padding: 0.5rem;
            border: none;
            outline: none;
        }
        input {
            width: 100%;
        }
    }
`

export default NewsForm;