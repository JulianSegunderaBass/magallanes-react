// The Landing Page
// Compiles Components from folder "for-landing"

import React from 'react';
// Page Components
import AboutUs from '../components/for-landing/AboutUs';
import Statements from '../components/for-landing/Statements';

const Landing = () => {
    return (
        <div>
            <AboutUs />
            <Statements />
        </div>
    )
}

export default Landing;