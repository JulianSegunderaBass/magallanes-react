// Component holding list of news announcements

import React from 'react';
// Importing Components
import NewsSummary from './NewsSummary';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { strongRevealUp } from '../../assets/Animations';

const NewsList = ({newsItems}) => {
    return (
        <MainContainer>
            <Hide>
                <HeaderSection variants={strongRevealUp}>
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
    @media (max-width: 1090px) {
        padding: 2rem 2rem;
    }
`
const Hide = styled.div`
    margin-bottom: 5rem;
    overflow: hidden;
    @media (max-width: 870px) {
        margin-bottom: 2rem;
    }
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
    @media (max-width: 870px) {
        h2 {
            font-size: 2rem;
        }
    }
`


const NewsSection = styled.div`

`

export default NewsList;