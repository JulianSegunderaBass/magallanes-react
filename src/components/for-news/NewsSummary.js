// Component for summarized card of news information

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Moment.js for created date
import moment from 'moment';
// For card link
import { Link } from 'react-router-dom';
// Importing Redux Action and Tools
import { useDispatch } from 'react-redux';
import { deleteAnnouncement } from '../../redux-store/actions/NewsActions';

// News Item is an object holding the news data
const NewsSummary = ({newsItem}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteAnnouncement(newsItem.id));
    }
    return (
        <NewsCard>
            {/* Section inside link tag is clickable */}
            <Link to={`/news-announcement/${newsItem.id}`} key={newsItem.id}>
                <h4>{newsItem.heading}</h4>
                {/* Using Moment.js to parse createdAt property to readable date */}
                <h5 id="time-stamp">{moment(newsItem.createdAt.toDate()).calendar()}</h5>
                {newsItem.attachmentURL && 
                    <h5 id="attachment-indicator">Image Present</h5>
                }
                <div className="divider"></div>
                <p>{newsItem.body}</p>
            </Link>
            {/* Absolutely-positioned delete button */}
            <button onClick={handleDelete}>X</button>
        </NewsCard>
    )
}

// Color Variables
const cardBackground = "#C7D1C4";
const hoverBackground = "#457B9D";
const contentHover = "#FFF";
const accentColor = "#E63946"

// Styled Components

const NewsCard = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: ${cardBackground};
    transition: background 0.5s ease;
    /* Relative positioning for button */
    position: relative;
    overflow: hidden;
    &:hover {
        background: ${hoverBackground};
        h4, h5, p {
            color: ${contentHover};
        }
        .divider {
            background: ${contentHover};
        }
    }
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .divider {
        width: 7%;
        height: 0.5rem;
        background: ${accentColor};
        transition: background 0.5s ease;
    }
    #attachment-indicator, #time-stamp {
        font-style: italic;
    }
    #attachment-indicator {
        margin-top: 1rem;
    }
    h4, h5, p {
        transition: color 0.5s ease;
    }
    button {
        position: absolute;
        top: -2%;
        right: -0.5%;
        border-radius: 0;
        padding: 0.5rem 1rem;
        background: ${accentColor};
        color: ${contentHover};
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

export default NewsSummary;