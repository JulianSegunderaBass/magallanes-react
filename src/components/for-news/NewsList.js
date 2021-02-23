// Component holding list of news announcements

import React, { useState } from 'react';
// Importing Components
import NewsSummary from './NewsSummary';
import Pagination from './Pagination';
// Importing Loading Spinner
import ReactSpinner from '../../assets/images/ReactSpinner.gif';
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
    let initialCurrentAnnouncements = newsItems && newsItems.slice(indexOfFirstPost, indexOfLastPost);
    let currentAnnouncements = initialCurrentAnnouncements;

    // Function to change page number on click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [searchAnnouncement, setSearchAnnouncement] = useState("");

    if (searchAnnouncement) {
        let filteredNewsItems = newsItems.filter(item => {
            return (item.heading.toLowerCase()).includes(searchAnnouncement.toLowerCase()) || (item.body.toLowerCase()).includes(searchAnnouncement.toLowerCase());
        });
        currentAnnouncements = filteredNewsItems;
    } else {
        currentAnnouncements = initialCurrentAnnouncements;
    }

    // While the list of News Announcements is not available,
    // Render out loading spinner gif
    if (!currentAnnouncements) {
        return (
            <LoadingContainer>
                <img src={ReactSpinner} alt="Loading Spinner" />
                <h4>Loading Announcements</h4>
            </LoadingContainer>
        )
    }

    // Render main content when News Announcements are available
    return (
        <MainContainer>
            <Hide>
                <HeaderSection variants={strongRevealUp}>
                    <h2>Browse the latest updates from Barangay</h2>
                    <div className="divider"></div>
                </HeaderSection>
            </Hide>
            <SearchSection>
                <input type="text" placeholder="Search an Announcement" onChange={e => setSearchAnnouncement(e.target.value)} />
            </SearchSection>
            {currentAnnouncements && 
                <NewsSection variants={fade}>
                    {currentAnnouncements.map(newsItem => {
                        return (
                            <NewsSummary newsItem={newsItem} key={newsItem.id} />
                        )
                    })}
                    {/* Pagination Component */}
                    {!searchAnnouncement &&
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={newsItems.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    }
                </NewsSection>
            }
        </MainContainer>
    )
}

// Color Variables
const dividerColor = "#E63946"
const boxBorder = "#1D3557";

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

const LoadingContainer = styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    img {
        margin: 2rem auto;
        width: 150px;
        height: 150px;
    }
    h4 {
        margin: 0 auto;
    }
`

const SearchSection = styled.div`
    input {
        display: block;
        width: 50%;
        margin: 0 auto 2rem auto;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 2px solid ${boxBorder};
        outline: none;
    }
    @media (max-width: 870px) {
        input {
            width: 100%;
        }
    }
`

export default NewsList;