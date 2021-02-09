// Details page for an announcement

import React from 'react';
import styled from 'styled-components'
// Animations
import { motion } from 'framer-motion';
import { pageLoad, fade, imageAnim } from '../assets/Animations';
// Redux
import { useSelector } from 'react-redux';
// Importing Moment.js for created date
import moment from 'moment';
// For card link
import { Link } from 'react-router-dom';
// Importing AutoScroll
import AutoScroll from '../assets/AutoScroll';


const AnnouncementDetails = (props) => {
    const NewsAnnouncements = useSelector((state) => state.firestore.data.NewsAnnouncements);
    // Matching route ID with data from state
    const id = props.match.params.id; 
    const NewsItem = NewsAnnouncements ? NewsAnnouncements[id] : null;
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            <AutoScroll />
            <Card>
                <motion.div variants={fade}>
                    <h4>{NewsItem.heading}</h4>
                    {/* Using Moment.js to parse createdAt property to readable date */}
                    <h5>{moment(NewsItem.createdAt.toDate()).calendar()}</h5>
                </motion.div>
                <div className="divider"></div>
                <p>{NewsItem.body}</p>
                {/* If attachment is detected, rendered here */}
                {NewsItem.attachmentURL &&
                    <Image>
                        <motion.img variants={imageAnim} src={NewsItem.attachmentURL} alt="image attachment"/>
                    </Image>
                }
                <Link to="/news">View other announcements</Link>
            </Card>
        </MainContainer>
    )
}

// Color Variables
const cardBackground = "#C7D1C4";
const dividerColor = "#E63946"
const mainBackground = "#F1FAEE";
const mainFontColor = "#1D3557";
const accentColor = "#E63946";

// Styled Components

const MainContainer = styled(motion.div)`
    padding: 5rem 7rem;
    min-height: 90vh;
    @media (max-width: 1090px) {
        padding: 2rem 2rem;
    }
`

const Card = styled.div`
    padding: 2.5rem 5rem;
    background: ${cardBackground};
    border-radius: 2rem;
    h4, h5 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    h5 {
        font-size: 1.2rem;
    }
    p {
        font-weight: lighter;
    }
    .divider {
        width: 85%;
        height: 0.5rem;
        background: ${dividerColor};
    }
    a {
        display: block;
        width: 35%;
        text-decoration: none;
        text-align: center;
        margin: 1rem auto;
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid ${accentColor};
        border-radius: 1rem;
        background: transparent;
        color: ${mainFontColor};
        /* Adding a transition for hover */
        transition: all 0.5s ease;
        font-family: 'Inter', sans-serif;
        &:hover {
            background-color: ${accentColor};
            color: ${mainBackground};
        }
    }
    @media (max-width: 870px) {
        padding: 2rem 1.2rem;
        h4 {
            font-size: 1.5rem;
        }
        a {
            width: 100%;
        }
    }
`

const Image = styled.div`
    overflow: hidden;
    img {
        width: 100%;
        /* Keeping aspect ratio even */
        object-fit: cover;
    }
`

export default AnnouncementDetails;