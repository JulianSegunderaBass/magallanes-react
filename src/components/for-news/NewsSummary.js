// Component for summarized card of news information

// Functional Imports
import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editAnnouncement } from '../../redux-store/actions/NewsActions';
import { deleteAnnouncement } from '../../redux-store/actions/NewsActions';
import { store } from 'react-notifications-component';
// Component Imports
import Modal from 'react-modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Data + Image Imports
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from "react-icons/bs";
// Styling + Animation Imports
import styled from 'styled-components';
import '../../assets/ModalStyle.css'

Modal.setAppElement("#root");

// News Item is an object holding the news data
const NewsSummary = ({ newsItem }) => {
    
    const dispatch = useDispatch();

    // Selecting Redux State
    const currentUserEmail = useSelector((state) => state.firebase.auth.email);

    // Local State
    const [deleteModalState, setDeleteModalState] = useState(false); // Modal States
    const [editModalState, setEditModalState] = useState(false);
    const [newsEdits, setNewsEdits] = useState({ // News Edits: announcementID is the ID reference of the post being edited
        announcementID: newsItem.id,
        heading: '',
        body: '',
        attachment: null,
        category1Selected: false,
        category2Selected: false,
        category3Selected: false,
        category4Selected: false
    });
    
    // Functions
    const handleEdits = (e) => {
        e.preventDefault();
        // Preventing submission if all form fields are empty
        if (
            newsEdits.heading === '' && 
            newsEdits.body === '' && 
            newsEdits.attachment === null
            ) {
                store.addNotification({
                    title: "Please provide a content edit",
                    message: "No content changes detected",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 6000,
                        onScreen: true
                    }
                });
        } else if (
            newsEdits.category1Selected === false && 
            newsEdits.category2Selected === false && 
            newsEdits.category3Selected === false && 
            newsEdits.category4Selected === false
            ) {
                store.addNotification({
                    title: "Please provide a post category",
                    message: "No categories selected",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 6000,
                        onScreen: true
                    }
                });
        } else {
            dispatch(editAnnouncement(newsEdits, newsItem));
            setEditModalState(false);
            setNewsEdits({
                ...newsEdits,
                category1Selected: false,
                category2Selected: false,
                category3Selected: false,
                category4Selected: false
            })
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
    const richEditorChange = (e, editor) => {
        const richContent = editor.getData();
        setNewsEdits({...newsEdits, body: richContent});
    }
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
                    {/* Displaying categories per post for filtering */}
                    <div className="post-categories">
                        {newsItem.category1 &&
                            <div className="category" id="category-1">Category 1</div>
                        }
                        {newsItem.category2 &&
                            <div className="category" id="category-2">Category 2</div>
                        }
                        {newsItem.category3 &&
                            <div className="category" id="category-3">Category 3</div>
                        }
                        {newsItem.category4 &&
                            <div className="category" id="category-4">Category 4</div>
                        }
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="sender-info">
                    <h5>{newsItem.authorFirstName} {newsItem.authorLastName}</h5>
                    <h5 id="sender-email">{newsItem.authorEmail}</h5>
                </div>
            </Link>
            <ButtonContainer>
                {/* Update and Delete Button */}
                {currentUserEmail === newsItem.authorEmail || currentUserEmail === process.env.REACT_APP_ADMIN_EMAIL_IDENTIFIER ? 
                    <div id="inner-button-container">
                        <button className="pop-modal" id="edit-button" onClick={() => setEditModalState(true)}><AiIcons.AiFillEdit /></button>
                        <button className="pop-modal" id="delete-button" onClick={() => setDeleteModalState(true)}><AiIcons.AiFillDelete /></button>
                    </div>
                 : 
                    ""
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
                            defaultValue={newsItem.heading} // Default value is the old news item heading
                            onChange={(e) => setNewsEdits({...newsEdits, heading: e.target.value})}
                        />
                        <RichContent>
                            <CKEditor 
                                id="rich-text-editor" 
                                editor={ClassicEditor} 
                                onChange={richEditorChange}
                                data={newsItem.body} // Data is the default value (the original post body)
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
                        {/* Toggling post categories */}
                        <div className="post-categories">
                            <div className="category">
                                <input type="checkbox" id="category-1"
                                    onChange={() => setNewsEdits(prevState => ({...newsEdits, category1Selected: !prevState.category1Selected}))}
                                />
                                <label htmlFor="category-1">Category 1</label>
                            </div>
                            <div className="category">
                                <input type="checkbox" id="category-2" 
                                    onChange={() => setNewsEdits(prevState => ({...newsEdits, category2Selected: !prevState.category2Selected}))}
                                />
                                <label htmlFor="category-2">Category 2</label>
                            </div>
                            <div className="category">
                                <input type="checkbox" id="category-3" 
                                    onChange={() => setNewsEdits(prevState => ({...newsEdits, category3Selected: !prevState.category3Selected}))}
                                />
                                <label htmlFor="category-3">Category 3</label>
                            </div>
                            <div className="category">
                                <input type="checkbox" id="category-4" 
                                    onChange={() => setNewsEdits(prevState => ({...newsEdits, category4Selected: !prevState.category4Selected}))}
                                />
                                <label htmlFor="category-4">Category 4</label>
                            </div>
                        </div>
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

// Styled Components + Color Variables
const cardBackground = "#C7D1C4";
const modalColor = "#FFF";
const accentColor = "#E63946";
const deleteButtonColor = "#E63946";
const editButtonColor = "#1D3557";
const boxBorder = "#1D3557";

const NewsCard = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    border-radius: 2rem;
    background: ${cardBackground};
    transition: all 0.5s ease;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
    &:hover {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
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
            }
            .post-categories {
                margin: 0.5rem 0;
                display: flex;
                .category {
                    display: inline;
                    margin: 0.5rem;
                    padding: 0.5rem;
                    border-radius: 1rem;
                    text-align: center;
                    @media (max-width: 870px) {               
                        font-size: 0.7rem;
                    }
                }
                #category-1 {
                    background: green;
                    color: white;
                }
                #category-2 {
                    background: blue;
                    color: white;
                }
                #category-3 {
                    background: orange;
                    color: white;
                }
                #category-4 {
                    background: purple;
                    color: white;
                }
                @media (max-width: 870px) {
                    flex-wrap: wrap;
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
`
const ButtonContainer = styled.div`
    #inner-button-container {
        display: flex;
        /* Buttons for triggering modals */
        .pop-modal {
            color: ${modalColor};
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
            justify-content: space-around;
            .pop-modal {
                font-size: 1.5rem;
                padding: 0.5rem 1.5rem;
            }
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
        input[type=text] {
            display: block;
            width: 100%;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 2px solid ${boxBorder};
            outline: none;
        }
        input[type=file] {
            border: none;
        }
        .post-categories {
            margin: 2rem 0;
            display: flex;
            .category {
                margin-right: 1.5rem;
                cursor: pointer;
                input, label {
                    cursor: pointer;
                }
                input {
                    margin-right: 0.5rem;
                }
            }
            @media (max-width: 870px) {
                flex-direction: column;
                align-items: center;
                .category {
                    margin-bottom: 1rem;
                }
            }
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

export default NewsSummary;
