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
            <Cards>
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
`

const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`

const Card = styled.div`
    flex-basis: 30%;
    display: flex;
    margin: 0 1.5rem 1.5rem 0;
    .image-container {
        border-radius: 0.5rem;
        overflow: hidden;
        img {
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
    }
`

export default Council;