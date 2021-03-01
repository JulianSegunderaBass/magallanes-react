// The Council Section for Barangay Officials
// On the Landing Page

// Functional Imports
import React from 'react';
// Data + Image Imports
import { CouncilData } from './CouncilData';
// Styling + Animation Imports
import styled from 'styled-components';

const Council = () => {
    return (
        <CouncilSection>
            <h2>Meet the <span>Council</span></h2>
            {/* The List of Cards. 
            Each Card represents a persona.*/}
            <Cards>
                {/* This function maps through the Council Data JS file,
                and returns a styled Card with that specific
                array object's information and index. */}
                {CouncilData.map((member, index) => {
                    return (
                        <Card key={index}>
                            <div className="image-container">
                                <img src={member.profileImage} alt={member.alternateImageText} />
                            </div>
                            <div className="bio-container">
                                <p>{member.memberName}</p>
                                <p><span>{member.memberPosition}</span></p>
                                <p className="email">{member.memberEmail}</p>
                                <p>{member.memberContact}</p>
                            </div>
                        </Card>
                    )
                })}
            </Cards>
        </CouncilSection>
    )
}

// Styled Components + Color Variables
const cardBackground = "#C7D1C4";

const CouncilSection = styled.div`
    min-height: 90vh;
    padding: 5rem 10rem;
    h2 {
        font-weight: lighter;
        margin-bottom: 2rem;
    }
    @media (max-width: 1090px) {
        h2 {
            padding: 0 5rem 0 5rem;
        }
        padding: 2rem 2rem;
    }
    @media (max-width: 870px) {
        h2 {
            padding: 0;
            text-align: center;
        }
    }
`

const Cards = styled.div`
    /* Grid display with two columns by default */
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* Creating a small gap between cards */
    grid-gap: 1rem;
    @media (max-width: 870px) {
        /* Stacks cards in one column for smaller screens */
        grid-template-columns: 1fr;
    }
`

const Card = styled.div`
    /* Two-column grid inside each card
    Second column (bio text) takes up
    proportionally more space */
    display: grid;
    grid-template-columns: 1fr 2fr;
    background: ${cardBackground};
    /* Border radius creates rounded corners */
    border-radius: 0.5rem;
    overflow: hidden;
    .image-container {
        overflow: hidden;
        img {
            /* Adjusting the image size per card.
            Image size is proportional to 
            image container */
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .bio-container {
        /* Wrapping settings to break words 
        that have spaces */
        overflow-wrap: break-word;
        word-wrap: break-word;      
        .email {
            /* Wrapping settings to break email
            which doesn't have any spaces */
            word-break: break-all;
        }
        p {
            padding: 0;
            margin: 0.5rem 0.5rem;
        }
        @media (max-width: 870px) {
            p {
                font-size: 1.2rem;
            }
        }
    }
`

export default Council;