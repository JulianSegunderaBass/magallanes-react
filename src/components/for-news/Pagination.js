// Pagination component for News Reports Page

import React from 'react';
// Importing Styled Components
import styled from 'styled-components';

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];

    // Pushing page numbers into array depending on total number of Firestore News Posts and Posts Per Page
    // Note: totalPosts is the length(number) of news items fetched from Firestore
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <MainContainer>
            {pageNumbers.map(number => (
                <button className={currentPage == number ? 'active' : ''} key={number} onClick={() => paginate(number)}>{number}</button>
            ))}
        </MainContainer>
    )
}

// Active Color Variables
const numberColor = "#F1FAEE";
const backgroundColor = "#E63946";

// Styled Components
const MainContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    button {
        padding: 0.5rem 1rem;
        margin: 0.2rem;
        border-radius: 0;
    }
    /* When a pagination button is selected */
    .active {
        background: ${backgroundColor};
        color: ${numberColor};
    }
`

export default Pagination;