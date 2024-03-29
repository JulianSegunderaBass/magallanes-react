// The list of FAQs on the FAQ page

// Functional Imports
import React, { useState } from 'react';
// Component Imports
import DropToggle from '../global/DropToggle';
// Data Imports
import { FaqData } from './FaqData';
// Styling + Animation Imports
import styled from 'styled-components';
import { AnimateSharedLayout } from 'framer-motion';


const FaqSection = () => {

    // Creating a "questions" state holding all the FAQ Data
    const [questions] = useState(FaqData);
    // Creating state for the search term
    const [searchTerm, setSearchTerm] = useState("");

    // A variable for the filtered FAQ list holding the search term
    const filteredFAQ = questions.filter(question => {
        return question.faqTitle.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
        <FaqSectionStyle>
            {/* Any changes to the input are set as the search term state */}
            <input type="text" placeholder="Search an FAQ" onChange={e => setSearchTerm(e.target.value)} />
            <AnimateSharedLayout>
                {/* Each DropToggle element is a clickable dropdown section */}
                {/* This function maps through the filtered questions state 
                which gets data from the FAQ Data JS file,
                and returns a styled toggle component with that specific
                array object's information and index. */}
                {filteredFAQ.map((question, index) => {
                    return (
                        <DropToggle title={question.faqTitle} key={index}>
                            <div className="drop-content">
                                <p>{question.faqContent}</p>
                            </div>
                        </DropToggle>
                    )
                })}
            </AnimateSharedLayout>
        </FaqSectionStyle>
    )
}

// Styled Components + Color Variables
const lineColor = "#E63946";
const boxBorder = "#1D3557";

const FaqSectionStyle = styled.div`
    min-height: 90vh;
    display: block;
    /* Padding to adjust space around whole component */
    padding: 5rem 10rem;
    /* The "line" element under each statement */
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
    input {
        display: block;
        width: 50%;
        margin: 0 auto 2rem auto;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 2px solid ${boxBorder};
        outline: none;
    }
    @media (max-width: 870px) {
        input {
            width: 100%;
        }
    }
    @media (max-width: 660px) {
        padding: 2rem 2rem;
    }
`

export default FaqSection;