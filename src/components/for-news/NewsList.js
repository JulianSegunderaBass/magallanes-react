// Component holding list of news announcements

import React from 'react';
// Importing Components
import NewsSummary from './NewsSummary';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { revealUp } from '../../assets/Animations';

const NewsList = ({newsItems}) => {
    return (
        <MainContainer>
            <Hide>
                <HeaderSection variants={revealUp}>
                    <h2>Browse the latest updates from Barangay</h2>
                    <div className="divider"></div>
                </HeaderSection>
            </Hide>
            <NewsSection>
                {newsItems && newsItems.map(newsItem => {
                    return (
                        <NewsSummary newsItem={newsItem} key={newsItem.id} />
                    )
                })}
            </NewsSection>
        </MainContainer>
    )
}

// Styled Components

const MainContainer = styled.div`
    min-height: 90vh;
    padding: 5rem 10rem;
`
const Hide = styled.div`
    margin-bottom: 5rem;
    height: 25vh;
    overflow: hidden;
`

const HeaderSection = styled(motion.div)`
    h2 {
        margin-bottom: 1rem;
    }
    .divider {
        width: 100%;
        height: 0.3rem;
        background: white;
    }
`


const NewsSection = styled.div`

`

export default NewsList;