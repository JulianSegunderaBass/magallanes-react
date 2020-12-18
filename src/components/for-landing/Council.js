// The Council Section for Barangay Officials
// On the Landing Page

import React from 'react';
// Importing Images
import ProfilePlaceholder from '../../assets/images/ProfilePlaceholder.png';
// Importing Styled Components
import styled from 'styled-components';

const Council = () => {
    return (
        <CouncilSection>
            <h2>Meet the <span>Council</span></h2>
            {/* The List of Cards. 
            Each Card represents a persona.*/}
            <Cards>
                <Card>
                    {/* Image Container holds the profile image. */}
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    {/* Bio Container holds the persona details. */}
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
                <Card>
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
                <Card>
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
                <Card>
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
                <Card>
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
                <Card>
                    <div className="image-container">
                        <img src={ProfilePlaceholder} alt="Placeholder Profile" />
                    </div>
                    <div className="bio-container">
                        <p>Member Name</p>
                        <p><span>Member Position</span></p>
                        <p>email@domain.com</p>
                        <p>1234-567-8900</p>
                    </div>
                </Card>
            </Cards>
        </CouncilSection>
    )
}

// Styled Components
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
    /* Flex wrap wraps the cards inside the container. 
    This makes the list responsive on mobile. */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`

const Card = styled.div`
    display: flex;
    margin: 0 1.5rem 1.5rem 0;
    .image-container {
        border-radius: 0.5rem;
        overflow: hidden;
        img {
            /* Adjusting the image size per card */
            width: 8rem;
            height: 100%;
            object-fit: cover;
        }
    }
    .bio-container {
        p {
            padding: 0;
            margin: 0.5rem 0.5rem;
        }
        @media (max-width: 660px) {
            p {
                font-size: 1.2rem;
            }
        }
    }
    @media (max-width: 660px) {
        margin: 1rem 0;
    }
`

export default Council;