// Page for Signing Up as admin

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad, newsFormReveal } from '../../assets/Animations';
// Redux Imports
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// Importing Redirect Feature
import { Redirect } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.firebase.auth);

    // Setting a local state for the form entry
    const [profile, setProfile] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const handleSubmit = (e) => {
        // Prevents page refreshing
        e.preventDefault();
        console.log(profile);
    }

    // If user ID is already present (meaning user is already logged in),
    // redirect user to home page
    if (auth.uid) return <Redirect to='/' />
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            <Hide>
                <TextSection variants={newsFormReveal}>
                    <h2>Sign <span>Up</span></h2>
                    <p>This Sign Up form is currently experimental</p>
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
                    <button>Sign Up</button>
                </form>
            </FormSection>
        </MainContainer>
    )
}

// Styled Components

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
            border: none;
            outline: none;
        }
        input {
            width: 100%;
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

export default SignUp;