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
// Importing Rich Text Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Spinner
import ReactSpinner from '../assets/images/ReactSpinner.gif';

const NewsForm = () => {
    const auth = useSelector((state) => state.firebase.auth);
    const publishingState = useSelector((state) => state.NewsAnnouncements.publishingAnnouncement);

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
    const richEditorChange = (e, editor) => {
        const richContent = editor.getData();
        setNewsAnnouncement({...newsAnnouncement, body: richContent});
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
                    <div className="divider"></div>
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
                    {/* <RichTextEditor id="rich-text-editor" onChange={richEditorChange} /> */}
                    <CKEditor 
                        id="rich-text-editor" 
                        editor={ClassicEditor} 
                        onChange={richEditorChange} 
                    />
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, .pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleAttachment}
                    />
                    {/* publishingState determines what button to render */}
                    {publishingState === false ? 
                        <button id="create-announcement">Create Announcement</button> 
                        : 
                        <div id="loading-button">
                            <button id="posting-announcement" disabled>Posting...</button>
                            <img src={ReactSpinner} alt="Loading Spinner" />
                        </div>
                    }
                </form>
            </FormSection>
        </MainContainer>
    )
}

// Color Variables
const boxBorder = "#1D3557";
const warningText = "#AB0A0A";
const successText = "#137D2D";
const accentColor = "#E63946";
const loadingButton = "#C7D1C4";

// Styled Components

const MainContainer = styled(motion.div)`
    min-height: 90vh;
    padding: 5rem 10rem;
    display: flex;
    flex-direction: column;
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
    .divider {
        width: 100%;
        height: 0.2rem;
        background: ${accentColor};
        margin-bottom: 2rem;
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
        input {
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
        /* Clearing text styles inside Rich Editor */
        h1, h2, h3, h4, h5, p {
            color: black;
            padding: 0;
            margin: 0;
            font-weight: light;
        }
        ol, ul {
            margin-left: 2rem;
            li {
                font-size: 1.4rem;
            }
        }
        button#create-announcement {
            display: block;
            margin-bottom: 0.5rem;
        }
        #loading-button {
            display: flex;
            align-items: center;
            button#posting-announcement {
                font-weight: bold;
                font-size: 1.1rem;
                cursor: progress;
                padding: 1rem 2rem;
                border: 3px solid ${loadingButton};
                border-radius: 1rem;
                background: ${loadingButton};
                color: black;
            }
            img {
                width: 50px;
                height: 50px;
            }
            @media (max-width: 870px) {
                flex-direction: column;
                button#posting-announcement {
                    margin-bottom: 1rem;
                }
            }
        }
        @media (max-width: 870px) {
            input {
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