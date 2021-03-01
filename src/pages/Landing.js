// The Landing Page
// Compiles Components from folder "for-landing"

// Functional Imports
import React from 'react';
// Component Imports
import AboutUs from '../components/for-landing/AboutUs';
import Statements from '../components/for-landing/Statements';
import Council from '../components/for-landing/Council';
import AutoScroll from '../assets/AutoScroll';
// Animation Imports
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';

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