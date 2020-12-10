// The Landing Page
// Compiles Components from folder "for-landing"

import React from 'react';
// Page Components
import AboutUs from '../components/for-landing/AboutUs';
import Statements from '../components/for-landing/Statements';
import Council from '../components/for-landing/Council';

const Landing = () => {
    return (
        <div>
            <AboutUs />
            <Statements />
            <Council />
        </div>
    )
}

export default Landing;