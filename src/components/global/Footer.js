// The Footer Section to be included at the bottom of each page

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterStyle>
            <Socials>
                <h4>Peek at our Socials</h4>
                <SocialLinks>
                    
                </SocialLinks>
            </Socials>
            <Contact></Contact>
        </FooterStyle>
    )
}

// Styled Components
const FooterStyle = styled.div`
    background: black;
`
const Socials = styled.div`

`
const SocialLinks = styled.div`

`

const Contact = styled.div`

`

export default Footer;