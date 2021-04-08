// Page for Signing In as admin

// Functional Imports
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signInUser, resetPass } from '../../redux-store/actions/AuthActions';
// Component Imports
import AutoScroll from '../../assets/AutoScroll';
import { Redirect } from 'react-router-dom';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../../assets/Animations';

const SignIn = () => {

    const dispatch = useDispatch();

    // Selecting Redux State
    const auth = useSelector((state) => state.firebase.auth);
    const authError = useSelector((state) => state.auth.authError);
    const attemptedEmail = useSelector((state) => state.auth.attemptedEmail);
    
    // Local State
    const [profile, setProfile] = useState({ // Setting a local state for the form entry
        email: '',
        password: ''
    });

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInUser(profile));
    }
    const handlePassReset = () => {
        dispatch(resetPass(attemptedEmail));
    }

    // Conditions
    if (auth.uid) { // If an authentication UID is present (user is already signed in), redirect to home
        return <Redirect to='/' />;
    }

    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2>Sign <span>In</span></h2>
                    <p>
                        Sign in to create your own news announcements. 
                        If you do not have an account, you may contact us to have one made.
                    </p>
                    <button>Contact Us</button>
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
                        type="password" 
                        placeholder="password" 
                        onChange={(e) => setProfile({...profile, password: e.target.value})}
                        required
                    />
                    {authError &&
                        <span id="forgot-password" onClick={handlePassReset}>Forgot your Password?</span>
                    }
                    <button>Sign In</button>
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
        button {
            display: block;
            margin: 0 auto 2rem auto;
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
        #forgot-password {
            display: block;
            margin: 1rem 0 2rem 0;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
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

export default SignIn;