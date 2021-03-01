// The "Statements" section for the Landing Page
// Vision, Mission and Pledge

// Functional Imports
import React from 'react';
// Component Imports
import DropToggle from '../global/DropToggle';
// Styling + Animation Imports
import styled from 'styled-components';
import { AnimateSharedLayout } from 'framer-motion';

const Statements = () => {
    return (
        <StatementSection>
            <AnimateSharedLayout>
                {/* Each DropToggle element is a clickable dropdown section */}
                <DropToggle title="Our Vision Statement">
                    <div className="drop-content">
                        <p>We envision Barangay Magallanes to be a community that is united and not divided.  A sense of belonging, togetherness and cooperation can help in making a peaceful, progressive, participatory and vibrant Barangay.</p>
                    </div>
                </DropToggle>
                <DropToggle title="Our Mission Statement">
                    <div className="drop-content">
                        <p>Barangay Magallanes to deliver to its constituents all the services necessary for the Barangay to meet its objectives.</p>
                        <p>Furthermore, the barangay aims to sustain its good governance and develop a vibrant citizentry with assistance of technology and the City Government . Barangay Magallanes also aims to play a major role in the success of the City Government by working to attain a sustainable growth in the local economy.</p>
                    </div>
                </DropToggle>
                <DropToggle title="Our Pledge">
                    <div className="drop-content">
                        <p>We envision Barangay Magallanes to be a community that is united and not divided.  A sense of belonging, togetherness and cooperation can help in making a peaceful, progressive, participatory and vibrant Barangay.</p>
                    </div>
                </DropToggle>
            </AnimateSharedLayout>
        </StatementSection>
    )
}

// Styled Components + Color Variables
const lineColor = "#E63946";

const StatementSection = styled.div`
    min-height: 90vh;
    display: block;
    padding: 5rem 10rem;
    /* These styling lines carry over to DropTogge.js to 
    style the elements over there as well */
    .line {
        background: ${lineColor};
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
            line-height: 2rem;
        }
    }
    @media (max-width: 660px) {
        padding: 2rem 2rem;
    }
`

export default Statements;