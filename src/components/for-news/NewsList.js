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
// For Redux Actions and State
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createAnnouncement } from '../../redux-store/actions/NewsActions';
// Testing CSS Import
import '../../assets/ModalStyle.css';
// Importing Rich Text Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Importing Modal
import Modal from 'react-modal';

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

    // For creating a News Announcement
    const auth = useSelector((state) => state.firebase.auth);
    const publishingState = useSelector((state) => state.NewsAnnouncements.publishingAnnouncement);
    const [createModalState, setCreateModalState] = useState(false);
    // Allowing the form to dispatch action
    const dispatch = useDispatch();
    // Setting a local state for the form entry
    const [newsAnnouncement, setNewsAnnouncement] = useState({
        heading: '',
        body: '',
        attachment: null
    });
    // Submit function to dispatch action with data
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAnnouncement(newsAnnouncement));
    }
    const handleAttachment = (e) => {
        if (e.target.files[0]) {
            setNewsAnnouncement({
                ...newsAnnouncement, 
                attachment: e.target.files[0]})
        }
    }
    const richEditorChange = (e, editor) => {
        const richContent = editor.getData();
        setNewsAnnouncement({...newsAnnouncement, body: richContent});
    }

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
                <button onClick={() => setCreateModalState(true)}>Create an Announcement</button>
                <input type="text" placeholder="Search an Announcement" onChange={e => setSearchAnnouncement(e.target.value)} />
                {/* Edit Post Modal */}
                <Modal
                    isOpen={createModalState}
                    onRequestClose={() => setCreateModalState(false)}
                    className="form-modal"
                    overlayClassName="form-modal-overlay"
                >
                    <ModalContent>
                        <form onSubmit={handleSubmit}>
                            <h4 className="modal-text">Create an Announcement</h4>
                            <input 
                                type="text" 
                                placeholder="Enter your news headline here" 
                                onChange={(e) => setNewsAnnouncement({...newsAnnouncement, heading: e.target.value})}
                            />
                            <RichContent>
                                <CKEditor 
                                    id="rich-text-editor" 
                                    editor={ClassicEditor} 
                                    onChange={richEditorChange} 
                                />
                            </RichContent>
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg, .pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleAttachment}
                            />
                            <button className="edit-modal-button">Create Post</button>
                            <button className="edit-modal-button" onClick={() => setCreateModalState(false)}>Cancel</button>
                        </form>
                    </ModalContent>
                </Modal>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    input {
        display: block;
        width: 70%;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 2px solid ${boxBorder};
        outline: none;
    }
    @media (max-width: 1100px) {
        input {
            width: 50%;
        }
    }
    @media (max-width: 870px) {
        flex-direction: column;
        button {
            margin-bottom: 1.5rem;
        }
        input {
            width: 100%;
            font-size: 1rem;
        }
    }
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button.delete-modal-button {
        width: 50%;
        margin: 0.5rem 0;
        @media (max-width: 870px) {
            width: 100%;
        }
    }
    button.edit-modal-button {
        width: 40%;
        margin: 0.5rem 5%;
        @media (max-width: 870px) {
            width: 100%;
            margin: 0.5rem 0;
        }
    }
    .modal-text {
        margin-bottom: 1rem;
    }
    form {
        width: 100%;
        input, textarea {
            display: block;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 2px solid ${boxBorder};
            outline: none;
        }
        input {
            width: 100%;
        }
        input[type=file] {
            border: none;
        }
        textarea {
            width: 100%;
        }
        @media (max-width: 870px) {
            input, textarea {
                font-size: 1rem;
            }
            textarea {
                /* column-count: 10; */
            }
        }
    }
`

const RichContent = styled.div`
    h1, h2, h3, h4, h5, p {
        color: black;
        padding: 0;
        margin: 0;
        font-weight: light;
    }
    ol, ul {
        margin-left: 2rem;
        li {
            font-size: 1.4rem;
        }
    }
`

export default NewsList;