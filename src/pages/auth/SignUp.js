// Page for Signing Up as admin

// Functional Imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signUpUser } from '../../redux-store/actions/AuthActions';
// Component Imports
import AutoScroll from '../../assets/AutoScroll';
import { Redirect } from 'react-router-dom';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../../assets/Animations';

const SignUp = () => {

    const dispatch = useDispatch();

    // Selecting Redux State
    const auth = useSelector((state) => state.firebase.auth);

    // Local State
    const [profile, setProfile] = useState({ // Setting a local state for the form entry
        email: '',
        firstName: '',
        lastName: ''
    });

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUpUser(profile));
    }

    // Conditions
    if (!auth.uid) { // If user is not authenticated, redirect to home
        return <Redirect to='/' />;
    } else if (auth.uid && auth.email !== process.env.REACT_APP_ADMIN_EMAIL_IDENTIFIER) { // If user is authenticated but not admin, redirect to home
        return <Redirect to='/' />;
    } // Otherwise, if user is authenticated and admin account email is detected, load sign up page

    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2><span>Sign Up</span> a User</h2>
                    <p>
                        As the website admin, you may use this page to create accounts for others.
                    </p>
                    <p>
                        Created users will receive two emails: one to verify, and another to change their password.
                    </p>
                </TextSection>
            </Hide>
            <FormSection>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="email" 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        required
                    />
                    <button>Create User</button>
                </form>
            </FormSection>
        </MainContainer>
    )
}

// Styled Components + Color Variables
const boxBorder = "#1D3557";
const warningText = "#AB0A0A";
const successText = "#137D2D";

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
    width: 50%;
    @media (max-width: 1500px) {
        width: 100%;
    }
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
        input {
            display: block;
            width: 175%;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 2px solid ${boxBorder};
            outline: none;
        }
        @media (max-width: 870px) {
            input {
                font-size: 1rem;
                width: 100%;
            }
            button {
                display: block;
                margin: 1.5rem auto 0 auto;
            }
        }
        
    }
`

export default SignUp;