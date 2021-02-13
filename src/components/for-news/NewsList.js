// Component holding list of news announcements

import React, { useState } from 'react';
// Importing Components
import NewsSummary from './NewsSummary';
import Pagination from './Pagination';
// Importing Styled Components
import styled from 'styled-components';
// Importing Framer Motion and Animations
import { motion } from 'framer-motion';
import { strongRevealUp, fade } from '../../assets/Animations';
// For card link
import { Link } from 'react-router-dom';

// News Items is an array of objects
const NewsList = ({newsItems}) => {
    // Pagination Variables
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // Slicing initial state of News Items
    const currentAnnouncements = newsItems && newsItems.slice(indexOfFirstPost, indexOfLastPost);

    // Function to change page number on click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <MainContainer>
            <Hide>
                <HeaderSection variants={strongRevealUp}>
                    <h2>Browse the latest updates from Barangay</h2>
                    <div className="divider"></div>
                </HeaderSection>
            </Hide>
            {currentAnnouncements && 
                <NewsSection variants={fade}>
                    {currentAnnouncements.map(newsItem => {
                        return (
                            <Link to={`/news-announcement/${newsItem.id}`} key={newsItem.id}>
                                <NewsSummary newsItem={newsItem} key={newsItem.id} />
                            </Link>
                        )
                    })}
                    {/* Pagination Component */}
                    <Pagination 
                        postsPerPage={postsPerPage} 
                        totalPosts={newsItems.length} 
                        paginate={paginate} 
                        currentPage={currentPage} 
                    />
                </NewsSection>
            }
        </MainContainer>
    )
}

// Color Variables
const dividerColor = "#E63946"

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
        background: ${dividerColor};
    }
    @media (max-width: 870px) {
        h2 {
            font-size: 2rem;
        }
    }
`


const NewsSection = styled(motion.div)`
    a {
        text-decoration: none;
    }
`

export default NewsList;