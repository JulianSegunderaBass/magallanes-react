// Component for summarized card of news information

import React, { useState } from "react";
// Importing Styled Components
import styled from "styled-components";
// Importing Moment.js for created date
import moment from "moment";
// For card link
import { Link } from "react-router-dom";
// Importing Redux Action and Tools
import { useDispatch } from "react-redux";
import { deleteAnnouncement } from "../../redux-store/actions/NewsActions";
// Importing Modal
import Modal from "react-modal";
// Importing all production Icons with code names
import * as AiIcons from "react-icons/ai";
// For connecting to Redux state
import { useSelector } from "react-redux";

Modal.setAppElement("#root");
// News Item is an object holding the news data
const NewsSummary = ({ newsItem }) => {
  // Connecting to Redux auth status
  const currentUserEmail = useSelector((state) => state.firebase.auth.email);
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    setModalState(false);
    dispatch(deleteAnnouncement(newsItem.id));
  };
  return (
    <NewsCard style={{ zIndex: -1 }}>
      {/* Section inside link tag is clickable */}
      <Link to={`/news-announcement/${newsItem.id}`} key={newsItem.id}>
        <h4>{newsItem.heading}</h4>
        {/* Using Moment.js to parse createdAt property to readable date */}
        <h5 id="time-stamp">
          {moment(newsItem.createdAt.toDate()).calendar()}
        </h5>
        <div className="sender-info">
          <h5>Posted By:</h5>
          <h5>
            {newsItem.authorFirstName} {newsItem.authorLastName}
          </h5>
          <h5 id="sender-email">{newsItem.authorEmail}</h5>
        </div>
        {newsItem.attachmentURL && (
          <h5 id="attachment-indicator">Image Present</h5>
        )}
        <div className="divider"></div>
        <p>{newsItem.body}</p>
      </Link>
      {/* Absolutely-positioned delete button activates modal */}
      {currentUserEmail == newsItem.authorEmail ? (
        <button id="pop-modal" onClick={() => setModalState(true)}>
          <AiIcons.AiFillDelete />
        </button>
      ) : (
        ""
      )}
      {/* Modal Component */}
      <Modal
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(3, 25, 38, 0.75)",
          },
          content: {
            width: "75%",
            height: "55%",
            top: "22.5%",
            left: "12.5%",
            right: "12.5%",
            bottom: "22.5%",
            borderRadius: "1rem",
            padding: "1rem",
          },
        }}
      >
        <div className="modal-item-container">
          <h4 id="modal-text">Are you sure you wish to delete this post?</h4>
          <button className="modal-button" onClick={handleDelete}>
            Delete Announcement
          </button>
          <button className="modal-button" onClick={() => setModalState(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </NewsCard>
  );
};

// Color Variables
const cardBackground = "#C7D1C4";
const hoverBackground = "#457B9D";
const contentHover = "#FFF";
const accentColor = "#E63946";

// Styled Components

const NewsCard = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 2rem;
  background: ${cardBackground};
  transition: background 0.5s ease;
  /* Relative positioning for button */
  position: relative;
  overflow: hidden;
  &:hover {
    background: ${hoverBackground};
    h4,
    h5,
    p {
      color: ${contentHover};
    }
    .divider {
      background: ${contentHover};
    }
  }
  h4 {
    margin-top: 1.2rem;
  }
  h4,
  h5 {
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
  .divider {
    width: 7%;
    height: 0.5rem;
    background: ${accentColor};
    transition: background 0.5s ease;
  }
  #attachment-indicator,
  #time-stamp,
  #sender-email {
    font-style: italic;
  }
  #attachment-indicator {
    margin-top: 1rem;
  }
  h4,
  h5,
  p {
    transition: color 0.5s ease;
  }
  .sender-info {
    margin: 1rem 0;
    h5 {
      font-weight: lighter;
    }
  }
  /* Button for triggering delete modal */
  #pop-modal {
    position: absolute;
    top: -5%;
    right: -1%;
    border-bottom-left-radius: 2rem;
    padding: 1rem 2.5rem 0.1rem 2rem;
    background: ${accentColor};
    color: ${contentHover};
    font-size: 2rem;
  }
  @media (max-width: 870px) {
    h4 {
      font-size: 1.5rem;
    }
    .divider {
      width: 20%;
    }
    #pop-modal {
      font-size: 1.5rem;
      padding: 1.1rem 1.7rem 0.1rem 1.5rem;
      right: -3%;
    }
  }
`;

export default NewsSummary;
