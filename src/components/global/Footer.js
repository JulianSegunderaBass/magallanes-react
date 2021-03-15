// The Footer Section to be included at the bottom of each page

// Functional Imports
import React from 'react';
// Icon Imports
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// Styling + Animation Imports
import styled from 'styled-components';

const Footer = () => {

    // Functions
    const handleSubmit = (e, form) => {
        e.preventDefault();
    }

    return (
        <FooterStyle>
            <Socials>
                <Contact>
                    <p>Lot 2, Block 6 , San Antonio Street, Paseo de Magallanes City of Makati, Republic of the Philippines</p>
                    <p><span>+632-7295114 / +632-8530564</span></p>
                </Contact>
                <SocialLinks>
                    <a href="https://www.facebook.com/barangay.magallanes.7" className="social-link">
                        <FaFacebook size="2rem" color="#1D3557" />
                    </a>
                    <a href="https://www.facebook.com/barangay.magallanes.7" className="social-link">
                        <FaTwitter size="2rem" color="#031926" />
                    </a>
                    <a href="https://www.facebook.com/barangay.magallanes.7" className="social-link">
                        <FaInstagram size="2rem" color="#E63946" />
                    </a>
                </SocialLinks>
            </Socials>
            <form 
                name="contact-form" 
                action="/contact-form" 
                method="post" 
                onSubmit={handleSubmit}
            >
                <p>Have a Concern? Get in touch. We'll respond to you via your email.</p>
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                />
                <textarea 
                    rows="5"
                    placeholder="Your Message" 
                    required
                />
                <button>Send Message</button>
            </form>
        </FooterStyle>
    )
}

// Styled Components + Color Variables
const footerBackground = "#C7D1C4";
const dividerColor = "#1D3557"

const FooterStyle = styled.div`
    background: ${footerBackground};
    padding: 2rem 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 870px) {
        flex-direction: column;
    }
    form {
        width: 35%;
        padding-left: 2rem;
        border-left: 1px solid ${dividerColor};
        @media (max-width: 870px) {
            width: 100%;
            margin-top: 1rem;
            padding-left: 0;
            border-left: none;
            border-top: 1px solid ${dividerColor};
        }
        input, textarea {
            display: block;
            margin-bottom: 1rem;
            font-size: 1rem;
            padding: 0.5rem;
            width: 100%;
        }
        textarea {
            resize: none;
        }
        button {
            padding: 0.2rem 0.4rem;
            border-radius: 0.6rem;
            @media (max-width: 870px) {
                display: block;
                margin: 0 auto;
            }
        }
    }
`
const Socials = styled.div`
    width: 50%;
    @media (max-width: 870px) {
        width: 100%;
        text-align: center;
    }
`
const SocialLinks = styled.div`
    /* Auto margin centers the container div */
    /* margin: 1.2rem auto;  */
    /* width: 25%; */
    display: flex;
    @media (max-width: 870px) {
        margin: 0 auto;
        justify-content: center;
    }
    .social-link {
        margin-right: 1rem;
    }
`
const Contact = styled.div`
    p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        padding: 0;
    }
    @media (max-width: 870px) {
        p {
            font-size: 1rem;
        }
    }
`

export default Footer;