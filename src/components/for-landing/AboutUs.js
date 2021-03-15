// The starting "About Us" section on the Landing Page

// Functional Imports
import React from 'react';
// Data + Image Imports
import BrngLogo from '../../assets/images/BrngLogo.png';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { revealUp, imageAnim } from '../../assets/Animations';

const AboutUs = () => {

    // Functions
    const handleScroll = () => {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <AboutSection>
            <TextSection>
                <Hide>
                    <motion.h2 variants={revealUp}>About <motion.span variants={revealUp}>Us</motion.span></motion.h2>
                </Hide>
                <p>The Barangay Council of Magallanes is a local government unit that services and protects the interests of its community. It is one of 33 barangays in the City of Makati.</p>
                <p>It has a land area of 119 hectares and comprises of 4 residential and 2 commercial communities: Ecology Village, Galeria de Magallanes, Magallanes Village, Paseo de Magallanes, Chino Roces Estates Association and Paseo de Magallanes Commercial Association.</p>
                <button onClick={handleScroll}>Contact Us</button>
            </TextSection>
            <Image>
                <motion.img variants={imageAnim} src={BrngLogo} alt="Barangay Logo" />
            </Image>
        </AboutSection>
    )
}

// Styled Components
const AboutSection = styled.div`
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 10rem;
    @media (max-width: 870px) {
        display: block;
        padding: 2rem 2rem;
    }
`
const TextSection = styled.div`
    flex: 1;
    padding-right: 5rem;
    p {
        line-height: 2.2rem;
    }
    h2 {
        font-weight: lighter;
        span {
            display: inline-block;
        }
    }
    @media (max-width: 870px) {
        padding: 0;
        text-align: center;
        p {
            text-align: left;
        }
        button {
            margin: 1rem auto 3rem auto;
            padding: 0.5rem 0.7rem;
            border-radius: 0.8rem;
            font-size: 1rem;
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

export default AboutUs;