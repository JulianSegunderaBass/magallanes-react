// Page for Signing In as admin

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../../assets/Animations';
// Importing AutoScroll function
import AutoScroll from '../../assets/AutoScroll';
// Importing Redux hooks and actions
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../redux-store/actions/AuthActions';
import { Redirect } from 'react-router-dom';

const SignIn = () => {
    const dispatch = useDispatch();
    const authError = useSelector((state) => state.auth.authError);
    const auth = useSelector((state) => state.firebase.auth);

    // Setting a local state for the form entry
    const [profile, setProfile] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        // Prevents page refreshing
        e.preventDefault();
        dispatch(signInUser(profile));
    }

    if (auth.uid) {
        return <Redirect to='/' />;
    }

    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2>Sign <span>In</span></h2>
                    <p>This Sign In form is currently experimental.</p>
                    <div>
                        {authError ? <p className="red-text">{authError}</p> : auth.isEmpty ? null : <p className="green-text">Login Success</p>}
                    </div>
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
                    <button>Sign In</button>
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

export default SignIn;