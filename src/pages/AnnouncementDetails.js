// Details page for an announcement

import React, { useState } from 'react';
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
// For parsing HTML markup
import ReactHtmlParser from 'react-html-parser';
// Importing Modal
import Modal from 'react-modal';
// Testing CSS import
import '../assets/ModalStyle.css';


const AnnouncementDetails = (props) => {
    const NewsAnnouncements = useSelector((state) => state.firestore.data.NewsAnnouncements);
    const [imageModalState, setImageModalState] = useState(false);
    // Matching route ID with data from state
    const id = props.match.params.id; 
    const NewsItem = NewsAnnouncements ? NewsAnnouncements[id] : null;
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            <AutoScroll />
            {NewsItem &&
                <Card>
                    <motion.div variants={fade}>
                        <h4>{NewsItem.heading}</h4>
                        {/* Using Moment.js to parse createdAt property to readable date */}
                        <h5>{moment(NewsItem.createdAt.toDate()).calendar()}</h5>
                        <div className="sender-info">
                            <h5>Posted By:</h5>
                            <h5>{NewsItem.authorFirstName} {NewsItem.authorLastName}</h5>
                            <h5 id="sender-email">{NewsItem.authorEmail}</h5>
                    </div>
                    </motion.div>
                    <div className="divider"></div>
                    {/* Section for rich text content */}
                    <RichContent>
                        {ReactHtmlParser(NewsItem.body)}
                    </RichContent>
                    {/* If attachment is detected, rendered here */}
                    {NewsItem.attachmentURL &&
                        NewsItem.attachmentType === 'image/jpeg' || NewsItem.attachmentType === 'image/png' ?
                            <Image>
                                <motion.img variants={imageAnim} src={NewsItem.attachmentURL} alt={NewsItem.attachmentName} onClick={() => setImageModalState(true)}/>
                            </Image>
                        :   
                            NewsItem.attachmentType === 'application/pdf' || NewsItem.attachmentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                                    <a id="media-link" href={NewsItem.attachmentURL} download>{NewsItem.attachmentName}</a>
                                :
                                    ''
                    }
                    <Link to="/news" id="return-link">View other announcements</Link>

                    {/* Image Modal */}
                    <Modal
                        isOpen={imageModalState}
                        onRequestClose={() => setImageModalState(false)}
                        className="attachment-modal"
                        overlayClassName="attachment-modal-overlay"
                    >
                        <div className="attachment-container">
                            <img variants={imageAnim} src={NewsItem.attachmentURL} alt={NewsItem.attachmentName}/>
                        </div>
                    </Modal>
                </Card>
            }
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
        width: 100%;
        height: 0.2rem;
        background: ${dividerColor};
    }
    a#return-link {
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
    a#media-link {
        display: block;
        width: 20%;
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-size: 0.7rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border: 1.5px solid ${accentColor};
        border-radius: 0.5rem;
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
    .sender-info {
        margin: 1rem 0;
        h5 {
            font-weight: lighter;
        }
        #sender-email {
            font-style: italic;
            word-break: break-all;
        }
    }
    @media (max-width: 870px) {
        padding: 2rem 1.2rem;
        h4 {
            font-size: 1.5rem;
        }
        a#return-link, a#media-link {
            width: 100%;
        }
    }
`

const RichContent = styled.div`
    margin: 2rem 0;
    h1, h2, h3, h4, h5, p {
        color: ${mainFontColor};
        padding: 0;
        margin: 0;
        font-weight: light;
    }
    ol, ul {
        color: ${mainFontColor};
        margin-left: 2rem;
        li {
            font-size: 1.2rem;
        }
    }
`

const Image = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        width: 50%;
        object-fit: contain;
        @media (max-width: 870px) {
            width: 100%;
        }
    }
`

export default AnnouncementDetails;