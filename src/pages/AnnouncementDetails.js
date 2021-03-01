// Details page for an announcement

// Functional Imports
import React, { useState } from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
// Component Imports
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import AutoScroll from '../assets/AutoScroll';
// Data + Image Imports
// Styling + Animation Imports
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { pageLoad, fade, imageAnim } from '../assets/Animations';
import '../assets/ModalStyle.css';

const AnnouncementDetails = (props) => {

    // Selecting Redux State
    const NewsAnnouncements = useSelector((state) => state.firestore.data.NewsAnnouncements);

    // Local State
    const [imageModalState, setImageModalState] = useState(false);
    const id = props.match.params.id;
    const NewsItem = NewsAnnouncements ? NewsAnnouncements[id] : null; // Matching route ID with data from state

    // Conditions
    if (
        NewsItem
        && localStorage.getItem("id") !== id
    ) {
        localStorage.setItem("new_items_id", id);
        localStorage.setItem("new_items_heading", NewsItem.heading);
        localStorage.setItem("new_items_createdAt", moment(NewsItem.createdAt.toDate()).calendar());
        localStorage.setItem("new_items_authorFirstName", NewsItem.authorFirstName);
        localStorage.setItem("new_items_authorLastName", NewsItem.authorLastName);
        localStorage.setItem("new_items_authorEmail", NewsItem.authorEmail);
        localStorage.setItem("new_items_body", NewsItem.body);
        localStorage.setItem("new_items_attachmentURL", NewsItem.attachmentURL);
        localStorage.setItem("new_items_attachmentType", NewsItem.attachmentType);
        localStorage.setItem("new_items_attachmentName", NewsItem.attachmentName);
    }
    
    return (
        <MainContainer variants={pageLoad} initial="hidden" animate="show" exit="exit">
            <AutoScroll />
            <Card>
                <motion.div variants={fade}>
                    <h4>{localStorage.getItem("new_items_heading")}</h4>
                    {/* Using Moment.js to parse createdAt property to readable date */}
                    <h5>{localStorage.getItem("new_items_createdAt")}</h5>
                    <div className="sender-info">
                        <h5>Posted By:</h5>
                        <h5>{localStorage.getItem("new_items_authorFirstName")} {localStorage.getItem("new_items_authorLastName")}</h5>
                        <h5 id="sender-email">{localStorage.getItem("new_items_authorEmail")}</h5>
                </div>
                </motion.div>
                <div className="divider"></div>
                {/* Section for rich text content */}
                <RichContent>
                    {ReactHtmlParser(localStorage.getItem("new_items_body"))}
                </RichContent>
                {/* If attachment is detected, rendered here */}
                {localStorage.getItem("new_items_attachmentURL") &&
                    localStorage.getItem("new_items_attachmentType") === 'image/jpeg' || localStorage.getItem("new_items_attachmentType") === 'image/png' ?
                        <Image>
                            <motion.img variants={imageAnim} src={localStorage.getItem("new_items_attachmentURL")} alt={localStorage.getItem("new_items_attachmentName")} onClick={() => setImageModalState(true)}/>
                        </Image>
                    :
                        localStorage.getItem("new_items_attachmentType") === 'application/pdf' || localStorage.getItem("new_items_attachmentType") === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                                <a id="media-link" href={localStorage.getItem("new_items_attachmentURL")} download>{localStorage.getItem("new_items_attachmentName")}</a>
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
                        <img variants={imageAnim} src={localStorage.getItem("new_items_attachmentURL")} alt={localStorage.getItem("new_items_attachmentName")}/>
                    </div>
                </Modal>
            </Card>
        </MainContainer>
    )
}

// Styled Components + Color Variables
const cardBackground = "#C7D1C4";
const dividerColor = "#E63946"
const mainBackground = "#F1FAEE";
const mainFontColor = "#1D3557";
const accentColor = "#E63946";

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
            display: block;
            width: 100%;
        }
        a#return-link {
            font-size: 0.8rem;
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