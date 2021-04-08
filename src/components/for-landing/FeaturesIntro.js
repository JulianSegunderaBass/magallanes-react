// The intro section to introduce people to the news announcement feature

// Functional Imports
import React from 'react';
// Component Imports
import { Link } from "react-router-dom";
// Data + Image Imports
import ComputerGif from '../../assets/images/computer.gif';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { revealUp, imageAnim } from '../../assets/Animations';

const FeaturesIntro = () => {
    return (
        <AboutSection>
            <TextSection>
                <Hide>
                    <motion.h3 variants={revealUp}>Have something you want to share with the community?</motion.h3>
                </Hide>
                <p>This website supports a news announcements section for you to post any concerns or ideas you feel need to be raised with the community.</p>
                <p>Simply create an account and you're good to go!</p>
                <Link to="/news">
                    <button>View Latest Community Posts</button>
                </Link>
            </TextSection>
            <Image>
                <motion.img variants={imageAnim} src={ComputerGif} alt="By Guillaume Kurkdjian on Behance" />
            </Image>
        </AboutSection>
    )
}

// Styled Components
const AboutSection = styled.div`
    min-height: 90vh;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    padding: 5rem 10rem;
    @media (max-width: 870px) {
        display: block;
        padding: 2rem 2rem;
    }
`
const TextSection = styled.div`
    flex: 1;
    padding-left: 5rem;
    p {
        line-height: 2.2rem;
    }
    h3 {
        font-weight: lighter;
    }
    @media (max-width: 870px) {
        padding: 0;
        button {
            margin: 1rem auto 3rem auto;
        }
    }
`
const Image = styled.div`
    flex: 1;
    overflow: hidden;
    img {
        width: 100%;
        object-fit: cover;
    }
`
const Hide = styled.div`
    overflow: hidden;
`

export default FeaturesIntro;