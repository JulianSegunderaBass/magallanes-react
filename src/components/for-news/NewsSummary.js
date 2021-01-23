// Component for summarized card of news information

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';

const NewsSummary = ({newsItem}) => {
    return (
        <NewsCard>
            <h4>{newsItem.heading}</h4>
            <div className="divider"></div>
            <p>{newsItem.body}</p>
        </NewsCard>
    )
}

// Styled Components

const NewsCard = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: #071b3d;
    border-radius: 2rem;
    h4 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    .divider {
        width: 7%;
        height: 0.5rem;
        background: #fde00d;
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