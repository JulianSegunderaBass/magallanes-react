// Component for summarized card of news information

import React from 'react';

const NewsSummary = ({newsItem}) => {
    return (
        <>
            <h2>{newsItem.heading}</h2>
            <p>{newsItem.body}</p>
        </>
    )
}

export default NewsSummary;