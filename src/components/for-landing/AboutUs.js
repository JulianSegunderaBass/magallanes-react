// The starting "About Us" section on the Landing Page

import React from 'react';
// Importing Images
import BrngLogo from '../../assets/images/BrngLogo.png';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { revealUp, imageAnim } from '../../assets/Animations';

const AboutUs = () => {
    return (
        <AboutSection>
            {/* Container for Text */}
            <TextSection>
                {/* "Hide" div for the title */}
                <Hide>
                    <motion.h2 variants={revealUp}>About <motion.span variants={revealUp}>Us</motion.span></motion.h2>
                </Hide>
                <p>The Barangay Council of Magallanes is a local government unit that services and protects the interests of its community. It is one of 33 barangays in the City of Makati.</p>
                <p>It has a land area of 119 hectares and comprises of 4 residential and 2 commercial communities: Ecology Village, Galeria de Magallanes, Magallanes Village, Paseo de Magallanes, Chino Roces Estates Association and Paseo de Magallanes Commercial Association.</p>
                <button>Contact Us</button>
            </TextSection>
            {/* Container for Image */}
            <Image>
                <motion.img variants={imageAnim} src={BrngLogo} alt="Barangay Logo" />
            </Image>
        </AboutSection>
    )
}

// Styled Components
const AboutSection = styled.div`
    min-height: 90vh;
    /* Flexing the text and image sections in a row */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Padding to adjust space around whole component */
    padding: 5rem 10rem;
    @media (max-width: 870px) {
        /* Display block helps the image take up more width */
        display: block;
        padding: 2rem 2rem;
    }
`

const TextSection = styled.div`
    flex: 1;
    /* Padding to adjust space to the right of text before image */
    padding-right: 5rem;
    p {
        line-height: 2.2rem;
    }
    h2 {
        font-weight: lighter;
        span {
            /* Inline Block helps to stagger the nested
            span animation */
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
            margin: 2rem 0rem 5rem 0rem;
        }
    }
`

const Image = styled.div`
    flex: 1;
    /* Hiding the overflow of image during animation */
    overflow: hidden;
    img {
        width: 100%;
        /* Keeping aspect ratio even */
        object-fit: cover;
    }
`

const Hide = styled.div`
    /* Hiding the element overflow for animations */
    overflow: hidden;
`

export default AboutUs;