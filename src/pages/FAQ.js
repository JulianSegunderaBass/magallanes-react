// The FAQ Page
// Compiles Components from folder "for-faq"

import React from 'react';
// Page Components
import FaqSection from '../components/for-faq/FaqSection';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
// Importing Auto Scroll component
import AutoScroll from '../assets/AutoScroll';

const FAQ = () => {
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
            <FaqSection />
        </motion.div>
    )
}

export default FAQ;