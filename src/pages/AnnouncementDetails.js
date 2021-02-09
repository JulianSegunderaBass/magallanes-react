// Details page for an announcement

import React from 'react';
import styled from 'styled-components'
import motion from 'framer-motion';
// Importing Redirect Component
import { Redirect } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Importing Moment.js for created date
import moment from 'moment';

const AnnouncementDetails = (props) => {
    const NewsAnnouncements = useSelector((state) => state.firestore.data.NewsAnnouncements);
    // Matching route ID with data from state
    const id = props.match.params.id; 
    const NewsItem = NewsAnnouncements ? NewsAnnouncements[id] : null;
    return (
        <Card>
            <h4>{NewsItem.heading}</h4>
            {/* Using Moment.js to parse createdAt property to readable date */}
            <h5>{moment(NewsItem.createdAt.toDate()).calendar()}</h5>
            <div className="divider"></div>
            <p>{NewsItem.body}</p>
            {NewsItem.attachmentURL && 
                <img src={NewsItem.attachmentURL} alt="image attachment"/>
            }    
        </Card>
    )
}

// Color Variables
const cardBackground = "#C7D1C4";
const dividerColor = "#E63946"

// Styled Components

const Card = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
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
        width: 7%;
        height: 0.5rem;
        background: ${dividerColor};
    }
    @media (max-width: 870px) {
        h4 {
            font-size: 1.5rem;
        }
        .divider {
            width: 20%;
        }
    }
`

export default AnnouncementDetails;