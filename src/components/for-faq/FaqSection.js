// The list of FAQs on the FAQ page

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing "DropToggle" Component for toggling functionality
import DropToggle from '../global/DropToggle';
// Importing Framer Motion
import { motion } from 'framer-motion';
// Importing "AnimateSharedLayout" - detects a change with the toggling
import { AnimateSharedLayout } from 'framer-motion';

const FaqSection = () => {
    return (
        <FaqSectionStyle>
            <AnimateSharedLayout>
                {/* Each DropToggle element is a clickable dropdown section */}
                <DropToggle title="FAQ 1">
                    <div className="drop-content">
                        <p>This is placeholder text for dropdown faq answer content.</p>
                    </div>
                </DropToggle>
                <DropToggle title="FAQ 2">
                    <div className="drop-content">
                        <p>This is placeholder text for dropdown faq answer content.</p>
                    </div>
                </DropToggle>
                <DropToggle title="FAQ 3">
                    <div className="drop-content">
                        <p>This is placeholder text for dropdown faq answer content.</p>
                    </div>
                </DropToggle>
            </AnimateSharedLayout>
        </FaqSectionStyle>
    )
}

// Styled Components
// We use the name "FaqSectionStyle" because using FaqSection
// would conflict between the FaqSection component and FaqSection
// Styled component
const FaqSectionStyle = styled.div`
    min-height: 90vh;
    display: block;
    /* Padding to adjust space around whole component */
    padding: 5rem 10rem;
    /* The "line" element under each statement */
    /* These styling lines carry over to DropTogge.js to 
    style the elements over there as well */
    .line {
        background: #fde00d;
        height: 0.2rem;
        margin: 2rem 0rem;
    }
    .toggle-element {
        padding: 1.5rem 0rem;
        cursor: pointer;
    }
    .drop-content {
        padding: 1rem 0rem;
        p {
            padding: 1rem 0rem;
        }
    }
`

export default FaqSection;