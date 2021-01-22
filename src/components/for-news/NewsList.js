// Component holding list of news announcements

import React from 'react';
// Importing Components
import NewsSummary from './NewsSummary';

const NewsList = ({newsItems}) => {
    return (
        <>
            {newsItems && newsItems.map(newsItem => {
                return (
                    <NewsSummary newsItem={newsItem} key={newsItem.id} />
                )
            })}
        </>
    )
}

export default NewsList;