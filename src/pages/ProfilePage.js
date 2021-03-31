// Page for displaying profile information + benefits

// Functional Imports
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetPass, verifyEmail, deleteAccount } from '../redux-store/actions/AuthActions';
import { setProfileImage } from '../redux-store/actions/AuthActions';
// Component Imports
import AutoScroll from '../assets/AutoScroll';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { imageAnim, pageLoad } from '../assets/Animations';
import '../assets/ModalStyle.css';

const ProfilePage = () => {

    const dispatch = useDispatch();

    // Selecting Redux State
    const auth = useSelector((state) => state.firebase.auth);
    const profileData = useSelector((state) => state.firebase.profile);

    // Local State
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [modalState, setModalState] = useState(false);

    // Functions
    const handleAttachment = (e) => {
        if (e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setProfileImage(profilePhoto, auth.uid, profileData.profileImageURL));
    }
    const handlePassReset = () => {
        dispatch(resetPass(auth.email));
    }
    const handleVerification = () => {
        dispatch(verifyEmail());
    }
    const handleDelete = () => {
        setModalState(false);
        dispatch(deleteAccount(auth.uid));
    }

    // Conditions
    if (!auth.uid) { // If an authentication UID is NOT present (user is not signed in), redirect to home
        return <Redirect to='/' />;
    }
    
    return (
        <ProfileContainer
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            {/* For Auto Scrolling to top */}
            <AutoScroll />
            <ProfileDisplay>
                <Image>
                    {/* Conditionally rendering profile image */}
                    <motion.img variants={imageAnim} src={profileData.profileImageURL ? profileData.profileImageURL : 'https://firebasestorage.googleapis.com/v0/b/magallanes-react.appspot.com/o/profile-images%2FprofilePlaceholder.png?alt=media&token=1bef4059-7389-4228-85ac-1991a24f3a67'} alt="profile-image" />
                </Image>
                <p>Change your Picture</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={handleAttachment}
                    />
                    <button id="photo-submit">Submit</button>
                </form>
            </ProfileDisplay>
            <div>
                <div className="divider"></div>
                <h2><span>Name:</span> {profileData.firstName} {profileData.lastName}</h2>
                <h4><span>Email:</span> <span id="email">{auth.email}</span></h4>
                <h4><span>Status:</span> {auth.emailVerified ? 'Verified' : 'Not Verified'}</h4>
                <div className="divider"></div>
                <h4><span>My Benefits:</span> </h4>
                <ul>
                    <li>{profileData.currentBenefits.benefit_1}</li>
                    <li>{profileData.currentBenefits.benefit_2}</li>
                    <li>{profileData.currentBenefits.benefit_3}</li>
                </ul>
                <div className="divider"></div>
                {!auth.emailVerified &&
                    <>
                        <h5>You may verify your account here. A message will be sent to your inbox with further instructions.</h5>
                        <button onClick={handleVerification}>Send Verification Email</button>
                        <div className="divider" id="verification-divider"></div>
                    </>
                }
                <h5>You may reset your password here. A message will be sent to your inbox with further instructions.</h5>
                <button onClick={handlePassReset}>Change Password</button>
                <div className="divider"></div>
                <button onClick={() => setModalState(true)}>Delete Your Account</button>
                {/* Delete Modal */}
                <Modal
                    isOpen={modalState}
                    onRequestClose={() => setModalState(false)}
                    className="delete-modal"
                    overlayClassName="delete-modal-overlay"
                >
                    <ModalContent>
                        <h4 className="modal-text">Are you sure you wish to delete your account?</h4>
                        <button onClick={handleDelete}>Delete Account</button>
                        <button onClick={() => setModalState(false)}>Cancel</button>
                    </ModalContent>
                </Modal>
            </div>
        </ProfileContainer>
    )
}

// Styled Components + Color Variables
const mainFontColor = "#1D3557";
const dividerColor = "#1D3557";

const ProfileContainer = styled(motion.div)`
    min-height: 90vh;
    padding: 5rem 10rem;
    display: flex;
    h2, h4, h5 {
        margin-bottom: 1rem;
    }
    ul {
        margin-top: 2rem;
        margin-bottom: 1rem;
        padding: 0 3rem;
        li {
            font-size: 1.8rem;
            color: ${mainFontColor};
        }
    }
    button {
        padding: 0.2rem 0.4rem;
        border-radius: 0.6rem;
    }
    #email {
        color: ${mainFontColor};
    }
    .divider {
        width: 100%;
        height: 0.3rem;
        background: ${dividerColor};
        margin-bottom: 3rem;
    }
    .divider:last-of-type {
        margin-top: 1.5rem;
    }
    #verification-divider {
        margin-top: 1rem;
    }
    @media (max-width: 1090px) {
        padding: 2rem 2rem;
    }
    @media (max-width: 870px) {
        flex-direction: column;
        h2 {
            font-size: 2rem;
        }
        li {
            font-size: 1.5rem
        }
        #email {
            color: ${mainFontColor};
            font-size: 1.2rem;
        }
        button {
            display: block;
            margin: 0 auto;
            padding: 0.5rem 0.7rem;
            border-radius: 0.8rem;
        }
    }
`
const ProfileDisplay = styled.div`
    margin-right: 2rem;
    width: 30%;
    height: 100%;
    form {
        #photo-submit {
            padding: 0.2rem 0.4rem;
            margin: 1.5rem 0;
            border-radius: 0.6rem;
            @media (max-width: 870px) {
                margin: 1rem auto 0 auto;
                padding: 0.5rem 0.7rem;
                border-radius: 0.8rem;
            }
        }
    }
    @media (max-width: 870px) {
        width: 100%;
        margin-bottom: 2rem;
    }
`
const Image = styled.div`
    margin: 0 auto;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    height: 50%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        width: 50%;
        margin: 0.5rem 0;
        @media (max-width: 870px) {
            width: 100%;
        }
    }
    .modal-text {
        margin-bottom: 1rem;
    }
`

export default ProfilePage;