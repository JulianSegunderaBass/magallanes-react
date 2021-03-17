// Component holding list of news announcements

// Functional Imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createAnnouncement } from '../../redux-store/actions/NewsActions';
// Component Imports
import NewsSummary from './NewsSummary';
import Pagination from './Pagination';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Data + Image Imports
import ReactSpinner from '../../assets/images/ReactSpinner.gif';
// Styling + Animation Imports
import styled from 'styled-components';
import '../../assets/ModalStyle.css';
import { motion } from 'framer-motion';
import { strongRevealUp, fade } from '../../assets/Animations';

// News Items is an array of objects
const NewsList = ({newsItems}) => {

    const dispatch = useDispatch();

    // Selecting Redux State
    const auth = useSelector((state) => state.firebase.auth);
    const publishingState = useSelector((state) => state.NewsAnnouncements.publishingAnnouncement);

    // Local State
    const [currentPage, setCurrentPage] = useState(1); // For Pagination: Pagination Variables
    const [postsPerPage] = useState(5);
    const [searchAnnouncement, setSearchAnnouncement] = useState("");
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let initialCurrentAnnouncements = newsItems && newsItems.slice(indexOfFirstPost, indexOfLastPost); // Slicing initial state of News Items
    let currentAnnouncements = initialCurrentAnnouncements;
    const [createModalState, setCreateModalState] = useState(false);
    const [newsAnnouncement, setNewsAnnouncement] = useState({ // For creating a News Announcement
        heading: '',
        body: '',
        attachment: null
    });

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAnnouncement(newsAnnouncement));
        setCreateModalState(false);
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
    const paginate = (pageNumber) => setCurrentPage(pageNumber); // Function to change page number on click

    // Conditions
    if (searchAnnouncement) {
        let filteredNewsItems = newsItems.filter(item => {
            return (item.heading.toLowerCase()).includes(searchAnnouncement.toLowerCase()) || (item.body.toLowerCase()).includes(searchAnnouncement.toLowerCase());
        });
        currentAnnouncements = filteredNewsItems;
    } else {
        currentAnnouncements = initialCurrentAnnouncements;
    }

    if (!currentAnnouncements) { // Render out loading spinner gif
        return (
            <LoadingContainer>
                <img src={ReactSpinner} alt="Loading Spinner" />
                <h4>Loading Announcements</h4>
            </LoadingContainer>
        )
    }

    return (
        <MainContainer>
            <Hide>
                <HeaderSection variants={strongRevealUp}>
                    <h2>Browse the latest updates from Barangay and The Community</h2>
                    <p>Note: Only <span><b>verified</b></span> accounts can post. You may verify through your <Link to="/my-profile" id="profile-link">Profile Page.</Link></p>
                    <div className="divider"></div>
                </HeaderSection>
            </Hide>
            <SearchSection>
                {/* Only render out create announcement function if authentication ID is detected */}
                {/* publishingState determines what button to render */}
                {auth.uid && auth.emailVerified === true ?
                        publishingState === false ? 
                        <button onClick={() => setCreateModalState(true)}>Create an Announcement</button> 
                        : 
                        <div id="loading-button">
                            <button id="posting-announcement" disabled>Posting...</button>
                            <img src={ReactSpinner} alt="Loading Spinner" />
                        </div>
                    :
                        ''
                }
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
                                    config={{
                                        toolbar: [ 'Heading', 'Bold', 'Italic', '|', 'bulletedList', 'numberedList', 'Link', '|', 'undo', 'redo' ]
                                    }}
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

// Styled Components + Color Variables
const dividerColor = "#E63946"
const boxBorder = "#1D3557";
const loadingButton = "#C7D1C4";

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
    .divider {
        width: 100%;
        height: 0.3rem;
        background: ${dividerColor};
    }
    #profile-link {
        color: ${dividerColor};
        &:hover {
            font-weight: bold;
        }
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
    #loading-button {
        display: flex;
        align-items: center;
        button#posting-announcement {
            font-weight: bold;
            font-size: 1.1rem;
            cursor: progress;
            padding: 1rem 2rem;
            border: 3px solid ${loadingButton};
            border-radius: 1rem;
            background: ${loadingButton};
            color: black;
        }
        img {
            width: 50px;
            height: 50px;
        }
        @media (max-width: 870px) {
            flex-direction: column;
            margin-bottom: 1rem;
            button#posting-announcement {
                margin-bottom: 1rem;
            }
        }
    }
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
            font-size: 1rem;
            padding: 0.5rem 0.7rem;
            border-radius: 0.8rem;
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
        input {
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
        @media (max-width: 870px) {
            input {
                font-size: 1rem;
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