// Page for creating a news announcement and sending data to Firebase Firestore

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../assets/Animations';
// Importing AutoScroll function
import AutoScroll from '../assets/AutoScroll';
// Redux Imports
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// Redux action to dispatch data
import { createAnnouncement } from '../redux-store/actions/NewsActions';
// Importing Redirect Component
import { Redirect } from 'react-router-dom';

const NewsForm = () => {
    const auth = useSelector((state) => state.firebase.auth);

    // Allowing the form to dispatch action
    const dispatch = useDispatch();
    // Setting a local state for the form entry
    const [newsAnnouncement, setNewsAnnouncement] = useState({
        heading: '',
        body: '',
        attachment: null
    });
    // Submit function to dispatch action with data
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAnnouncement(newsAnnouncement));
    }
    const handleAttachment = (e) => {
        if (e.target.files[0]) {
            setNewsAnnouncement({
                ...newsAnnouncement, 
                attachment: e.target.files[0]})
        }
    }

    // If an authentication UID is NOT present (user is not signed in),
    // redirect to home
    if (!auth.uid) {
        return <Redirect to='/' />;
    }
    
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2>News Announcement <span>Form</span></h2>
                    <p>The News Information Page will update with your post</p>
                </TextSection>
            </Hide>
            <FormSection>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter your news headline here" 
                        onChange={(e) => setNewsAnnouncement({...newsAnnouncement, heading: e.target.value})}
                        required
                    />
                    <textarea 
                        rows="10" 
                        cols="50" 
                        placeholder="Enter your news content here" 
                        onChange={(e) => setNewsAnnouncement({...newsAnnouncement, body: e.target.value})}
                        required
                    />
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={handleAttachment}
                    />
                    <button>Create Announcement</button>
                </form>
            </FormSection>
        </MainContainer>
    )
}

// Color Variables
const boxBorder = "#1D3557";
const warningText = "#AB0A0A";
const successText = "#137D2D";

// Styled Components

const MainContainer = styled(motion.div)`
    min-height: 90vh;
    padding: 5rem 10rem;
    display: flex;
    @media (max-width: 1500px) {
        flex-direction: column;
    }
    @media (max-width: 870px) {
        padding: 2rem 2rem;
        min-height: 45vh;
    }
`

const Hide = styled.div`
    overflow: hidden;
`

const TextSection = styled(motion.div)`
    padding-right: 5rem;
    .red-text {
        color: ${warningText};
    }
    .green-text {
        color: ${successText};
    }
    @media (max-width: 870px) {
        padding: 0;
        h2 {
            font-size: 2rem;
        }
    }
`

const FormSection = styled.div`
    form {
        input, textarea {
            display: block;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 2px solid ${boxBorder};
            outline: none;
        }
        input {
            width: 100%;
        }
        @media (max-width: 1500px) {
            textarea {
                width: 100%;
            }
        }
        @media (max-width: 870px) {
            input, textarea {
                font-size: 1rem;
            }
            button {
                display: block;
                margin: 1.5rem auto 0 auto;
            }
        }
        
    }
`

export default NewsForm;