// Component for summarized card of news information

import React, { useState } from 'react';
// Importing Styled Components
import styled from 'styled-components';
// Importing Moment.js for created date
import moment from 'moment';
// For card link
import { Link } from 'react-router-dom';
// Importing Redux Action and Tools
import { useDispatch } from 'react-redux';
import { deleteAnnouncement } from '../../redux-store/actions/NewsActions';
// Importing Modal
import Modal from 'react-modal';
// Importing all production Icons with code names
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from "react-icons/bs";
// For connecting to Redux state and action
import { useSelector } from 'react-redux';
import { editAnnouncement } from '../../redux-store/actions/NewsActions';
// For notifications
import { store } from 'react-notifications-component';
// Importing Rich Text Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Testing CSS Import
import '../../assets/ModalStyle.css'

Modal.setAppElement("#root");
// News Item is an object holding the news data
const NewsSummary = ({ newsItem }) => {
    
    // Allowing the form to dispatch action
    const dispatch = useDispatch();

    // Connecting to Redux auth status
    const currentUserEmail = useSelector((state) => state.firebase.auth.email);

    // Modal States
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);

    // Setting a local state for the form entry
    // Note: announcementID is the ID reference of the post being edited
    const [newsEdits, setNewsEdits] = useState({
        announcementID: newsItem.id,
        heading: '',
        body: '',
        attachment: null
    });

    const richEditorChange = (e, editor) => {
        const richContent = editor.getData();
        setNewsEdits({...newsEdits, body: richContent});
    }

    // Modal Functions
    const handleEdits = (e) => {
        e.preventDefault();
        // Preventing submission if all form fields are empty
        if (newsEdits.heading === '' && newsEdits.body === '' && newsEdits.attachment === null) {
            store.addNotification({
                title: "Please provide an edit",
                message: "No entries detected",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        } else {
            dispatch(editAnnouncement(newsEdits));
            setEditModalState(false);
        }
    };
    const handleDelete = () => {
        setDeleteModalState(false);
        if (newsItem.attachmentURL) {
            dispatch(deleteAnnouncement(newsItem.id, newsItem.attachmentURL));
        } else {
            dispatch(deleteAnnouncement(newsItem.id, ''));
        }
    };
    const handleAttachment = (e) => {
        if (e.target.files[0]) {
            setNewsEdits({
                ...newsEdits, 
                attachment: e.target.files[0]})
        }
    };
    return (
        <NewsCard>
            {/* Section inside link tag is clickable */}
            <Link to={`/news-announcement/${newsItem.id}`} key={newsItem.id} id="card-text">
                <div className="post-info">
                    <h4>{newsItem.heading}</h4>
                    <div className="date-image">
                    {/* Using Moment.js to parse createdAt property to readable date */}
                        <h5 id="time-stamp">{moment(newsItem.createdAt.toDate()).calendar()}</h5>
                        <>
                            {newsItem.attachmentURL && 
                                newsItem.attachmentType === 'image/jpeg' || newsItem.attachmentType === 'image/png' ?
                                    <BsIcons.BsCardImage color="#1D3557" size="2rem"/>
                                :
                                    newsItem.attachmentType === 'application/pdf' || newsItem.attachmentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                                        <AiIcons.AiOutlineFileText color="#1D3557" size="2rem"/>
                                    :
                                        ''
                            }
                        </>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="sender-info">
                    <h5>{newsItem.authorFirstName} {newsItem.authorLastName}</h5>
                    <h5 id="sender-email">{newsItem.authorEmail}</h5>
                </div>
                {/* <p>{ReactHtmlParser(newsItem.body)}</p> */}
            </Link>
            <ButtonContainer>
                {/* Update and Delete Button */}
                {currentUserEmail === newsItem.authorEmail || currentUserEmail === "adminuser@gmail.com" ? 
                <>
                    <button className="pop-modal" id="edit-button" onClick={() => setEditModalState(true)}><AiIcons.AiFillEdit /></button>
                    <button className="pop-modal" id="delete-button" onClick={() => setDeleteModalState(true)}><AiIcons.AiFillDelete /></button>
                </>
                 : ""
                }
            </ButtonContainer>
            {/* Modal Components */}

            {/* Edit Post Modal */}
            <Modal
                isOpen={editModalState}
                onRequestClose={() => setEditModalState(false)}
                className="form-modal"
                overlayClassName="form-modal-overlay"
            >
                <ModalContent>
                    <form onSubmit={handleEdits}>
                        <h4 className="modal-text">Edit Your Announcement</h4>
                        <input 
                            type="text" 
                            placeholder="Enter your news headline here" 
                            onChange={(e) => setNewsEdits({...newsEdits, heading: e.target.value})}
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
                        <button className="edit-modal-button">Save Edits</button>
                        <button className="edit-modal-button" onClick={() => setEditModalState(false)}>Cancel</button>
                    </form>
                </ModalContent>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalState}
                onRequestClose={() => setDeleteModalState(false)}
                className="delete-modal"
                overlayClassName="delete-modal-overlay"
            >
                <ModalContent>
                    <h4 className="modal-text">Are you sure you wish to delete this post?</h4>
                    <button className="delete-modal-button" onClick={handleDelete}>Delete Announcement</button>
                    <button className="delete-modal-button" onClick={() => setDeleteModalState(false)}>Cancel</button>
                </ModalContent>
            </Modal>
        </NewsCard>
    );
};

// Color Variables
const cardBackground = "#C7D1C4";
const hoverBackground = "#457B9D";
const contentHover = "#FFF";
const accentColor = "#E63946";
const deleteButtonColor = "#E63946";
const editButtonColor = "#1D3557";

// Styled Components

const NewsCard = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    border-radius: 2rem;
    background: ${cardBackground};
    transition: background 0.5s ease;
    /* Relative positioning for button */
    /* position: relative;
    overflow: hidden; */
    &:hover {
        background: ${hoverBackground};
        h4, h5, p {
            color: ${contentHover};
        }
        .divider {
            background: ${contentHover};
        }
    }
    h4 {
        margin-top: 1.2rem;
    }
    h4, h5 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    h5 {
        font-size: 1.2rem;
    }
    p {
        font-weight: lighter;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    h4, h5, p {
        transition: color 0.5s ease;
    }
    #card-text {
        display: flex;
        .post-info {
            width: 75%;
            .date-image {
                display: flex;
                align-items: center;
                #time-stamp {
                    margin-right: 1rem;
                }
                @media (max-width: 870px) {
                    /* flex-direction: column;
                    align-items: flex-start; */
                }
            }
        }
        .sender-info {
            width: 25%;
            margin: 1rem 0;
            border-left: 0.2rem solid ${accentColor};
            padding-left: 1rem;
            h5 {
                font-weight: lighter;
            }
            #sender-email {
                word-break: break-all;
            }
        }
        .divider {
            width: 13%;
            height: 0.2rem;
            background: ${accentColor};
            transition: background 0.5s ease;
            margin-bottom: 2rem;
        }
        #attachment-indicator, #time-stamp, #sender-email {
            font-style: italic;
        }
        #attachment-indicator {
            margin-top: 1rem;
        }
        @media (max-width: 870px) {
            flex-direction: column;
            .post-info, .sender-info {
                width: 100%;
            }
            .sender-info {
                border-left: none;
                padding-left: 0;
            }
            .divider {
                width: 100%;
                margin-bottom: 0.5rem;
            }
        }
    }
    @media (max-width: 870px) {
        h4 {
            font-size: 1.5rem;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    /* Buttons for triggering modals */
    .pop-modal {
        /* position: absolute;
        top: -5%;
        right: -1%;
        border-bottom-left-radius: 2rem;
        padding: 1rem 2.5rem 0.1rem 2rem;
        background: ${accentColor};
        color: ${contentHover};
        font-size: 2rem; */
        color: ${contentHover};
        font-size: 2rem;
        padding: 0.5rem 3rem;
        margin-right: 0.5rem;
    }
    #edit-button {
        background: ${editButtonColor};
        border-color: ${editButtonColor};
    }
    #delete-button {
        background: ${deleteButtonColor};
        border-color: ${deleteButtonColor};
    }
    @media (max-width: 870px) {
        .pop-modal {
            font-size: 1.5rem;
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
            border: 2px solid ${hoverBackground};
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

export default NewsSummary;
