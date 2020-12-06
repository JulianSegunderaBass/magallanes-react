// The Footer Section to be included at the bottom of each page

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing React Icons
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// Importing Link
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <FooterStyle>
            <Socials>
                <h5>Peek at our Socials</h5>
                <SocialLinks>
                        <Link to="https://www.facebook.com/barangay.magallanes.7" className="social-link">
                            <FaFacebook size="3rem" color="cornflowerblue" />
                        </Link>
                        <Link to="placeholder-twitter-link" className="social-link">
                            <FaTwitter size="3rem" color="lightblue" />
                        </Link>
                        <Link to="placeholder-instagram-link" className="social-link">
                            <FaInstagram size="3rem" color="yellow" />
                        </Link>
                </SocialLinks>
            </Socials>
            <Contact>
                <h5>Contact Us</h5>
                <p>Lot 2, Block 6 , San Antonio Street, Paseo de Magallanes City of Makati, Republic of the Philippines</p>
                <p><span>+632-7295114 / +632-8530564</span></p>
            </Contact>
        </FooterStyle>
    )
}

// Styled Components
const FooterStyle = styled.div`
    background: black;
    padding: 3rem 10rem;
`
const Socials = styled.div`
    text-align: center;
`
const SocialLinks = styled.div`
    margin: 1.2rem auto; 
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    .social-link {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`

const Contact = styled.div`
    text-align: center;
    h5 {
        padding: 1.5rem 0rem;
    }
`

export default Footer;