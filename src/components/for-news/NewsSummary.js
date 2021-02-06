// Component for summarized card of news information

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Moment.js for created date
import moment from 'moment';

// News Item is an object holding the news data
const NewsSummary = ({newsItem}) => {
    return (
        <NewsCard>
            <h4>{newsItem.heading}</h4>
            {/* Using Moment.js to parse createdAt property to readable date */}
            <h5>{moment(newsItem.createdAt.toDate()).calendar()}</h5>
            <div className="divider"></div>
            <p>{newsItem.body}</p>
        </NewsCard>
    )
}

// Color Variables
const cardBackground = "#C7D1C4";
const dividerColor = "#E63946"

// Styled Components

const NewsCard = styled.div`
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

export default NewsSummary;