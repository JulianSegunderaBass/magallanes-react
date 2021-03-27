// The Actions for News Announcements (dispatch to NewsReducer)
import firebase from 'firebase/app';
import 'firebase/storage';
import sha256 from 'crypto-js/sha256';
const CryptoJS = require("crypto-js");

// newsAnnouncement parameter is the new entry submitted via dispatch from component
export const createAnnouncement = (newsAnnouncement) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();
        // Accessing current logged profile state
        const loggedProfile = getState().firebase.profile;
        const loggedEmail = getState().firebase.auth.email;
        const dt = new Date();
        dispatch({type: 'PUBLISHING_ANNOUNCEMENT'});

        // If poster has decided to include an attachment
        if (newsAnnouncement.attachment) {
            let filenameArr = newsAnnouncement.attachment.name.split("."); // For splitting and getting file type ending
            let fileExt = filenameArr[filenameArr.length - 1];

            // Hash Variables
            let imgHashObj = sha256(`${newsAnnouncement.attachment.name}${dt.toLocaleDateString()}${dt.toLocaleTimeString()}`);
            let imgHashStr = `${imgHashObj.toString(CryptoJS.enc.Base64)}.${fileExt}`;

            const uploadTask = projectStorage.ref(`news-attachments/${imgHashStr}`).put(newsAnnouncement.attachment);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    projectStorage.ref("news-attachments").child(imgHashStr).getDownloadURL().then(url => {
                        // Once image is saved to Firebase Storage and URL is available
                        firestore.collection('NewsAnnouncements').add({
                            heading: newsAnnouncement.heading,
                            body: newsAnnouncement.body,
                            category1: newsAnnouncement.category1Selected,
                            category2: newsAnnouncement.category2Selected,
                            category3: newsAnnouncement.category3Selected,
                            category4: newsAnnouncement.category4Selected,
                            attachmentURL: url,
                            attachmentName: newsAnnouncement.attachment.name,
                            attachmentType: newsAnnouncement.attachment.type,
                            createdAt: new Date(),
                            authorFirstName: loggedProfile.firstName,
                            authorLastName: loggedProfile.lastName,
                            authorEmail: loggedEmail
                        }).then(() => {
                            dispatch({type: 'CREATE_ANNOUNCEMENT', payload: newsAnnouncement});
                        }).catch((error) => {
                            dispatch({type: 'CREATE_ANNOUNCEMENT_ERROR', error});
                        });
                    })
                }
            )
        } else {
            // Normal text entry with no attachment
            firestore.collection('NewsAnnouncements').add({
                heading: newsAnnouncement.heading,
                body: newsAnnouncement.body,
                category1: newsAnnouncement.category1Selected,
                category2: newsAnnouncement.category2Selected,
                category3: newsAnnouncement.category3Selected,
                category4: newsAnnouncement.category4Selected,
                createdAt: new Date(),
                authorFirstName: loggedProfile.firstName,
                authorLastName: loggedProfile.lastName,
                authorEmail: loggedEmail
            }).then(() => {
                dispatch({type: 'CREATE_ANNOUNCEMENT', payload: newsAnnouncement});
            }).catch((error) => {
                dispatch({type: 'CREATE_ANNOUNCEMENT_ERROR', error});
            });
        }
    }
}

// Function for making edits to announcements
// newsEdits are the edits being passed
export const editAnnouncement = (newsEdits, oldPostContent) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();
        const dt = new Date();
        dispatch({type: 'PUBLISHING_ANNOUNCEMENT'});

        // If poster has decided to include an attachment
        if (newsEdits.attachment) {
            let filenameArr = newsEdits.attachment.name.split("."); // For splitting and getting file type ending
            let fileExt = filenameArr[filenameArr.length - 1];
            
            // Hashing Variables
            let imgHashObj = sha256(`${newsEdits.attachment.name}${dt.toLocaleDateString()}${dt.toLocaleTimeString()}`);
            let imgHashStr = `${imgHashObj.toString(CryptoJS.enc.Base64)}.${fileExt}`;

            const uploadTask = projectStorage.ref(`news-attachments/${imgHashStr}`).put(newsEdits.attachment);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    projectStorage.ref("news-attachments").child(imgHashStr).getDownloadURL().then(url => {
                        // Once image is saved to Firebase Storage and URL is available
                        // Referencing announcement's ID for merging changes
                        if (newsEdits.heading !== '') {
                            firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                                heading: newsEdits.heading
                            }, { merge: true });
                        } 
                        if (newsEdits.body !== '') {
                            firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                                body: newsEdits.body
                            }, { merge: true });
                        }
                        // If previous post version has an attachment URL, delete old attachment from storage
                        if (oldPostContent.attachmentURL) {
                            var prevAttachmentReference = projectStorage.refFromURL(oldPostContent.attachmentURL);
                            prevAttachmentReference.delete();
                        }
                        firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                            createdAt: new Date(),
                            attachmentURL: url,
                            attachmentName: newsEdits.attachment.name,
                            attachmentType: newsEdits.attachment.type
                        }, { merge: true });
                        dispatch({type: 'UPDATE_ANNOUNCEMENT', payload: newsEdits});
                    })
                }
            )
        } else {
            // Normal text entry with no attachment
            // Referencing announcement's ID for merging changes
            if (newsEdits.heading !== '') {
                firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                    heading: newsEdits.heading
                }, { merge: true });
            } 
            if (newsEdits.body !== '') {
                firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                    body: newsEdits.body
                }, { merge: true });
            }
            firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                createdAt: new Date()
            }, { merge: true });
            dispatch({type: 'UPDATE_ANNOUNCEMENT', payload: newsEdits});
        }
    }
}

// announcementID is the ID of the post passed and used to reference the deletion
export const deleteAnnouncement = (announcementID, attachmentURL) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();

        if (attachmentURL === '') { // Deleting a post without an attachment
            firestore.collection('NewsAnnouncements').doc(announcementID).delete().then(() => {
                dispatch({type: 'DELETE_ANNOUNCEMENT'});
            }).catch((error) => {
                dispatch({type: 'DELETE_ANNOUNCEMENT_ERROR', error});
            });
        } else if (attachmentURL !== '') { // Deleting a post with an attachment + deleting storage file
            var attachmentReference = projectStorage.refFromURL(attachmentURL);
            attachmentReference.delete().then(() => {
                firestore.collection('NewsAnnouncements').doc(announcementID).delete();
                dispatch({type: 'DELETE_ANNOUNCEMENT'});
            }).catch((error) => {
                dispatch({type: 'DELETE_ANNOUNCEMENT_ERROR', error});
            });
        }    
    }
}