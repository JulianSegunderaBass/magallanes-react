// The Landing Page
// Compiles Components from folder "for-landing"

import React from 'react';
// Page Components
import AboutUs from '../components/for-landing/AboutUs';
import Statements from '../components/for-landing/Statements';
import Council from '../components/for-landing/Council';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
// Importing Auto Scroll component
import AutoScroll from '../assets/AutoScroll';

const Landing = () => {
    return (
        // Motion (animated) div as root component
        <motion.div 
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            {/* Auto Scrolling Component */}
            <AutoScroll />
            <AboutUs />
            <Statements />
            <Council />
        </motion.div>
    )
}

export default Landing;