// The Actions for News Announcements (dispatch to NewsReducer)
import firebase from 'firebase/app';
import 'firebase/storage';

// newsAnnouncement parameter is the new entry submitted via dispatch from component
export const createAnnouncement = (newsAnnouncement) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();
        // Accessing current logged profile state
        const loggedProfile = getState().firebase.profile;
        const loggedEmail = getState().firebase.auth.email;

        // If poster has decided to include an attachment
        if (newsAnnouncement.attachment) {
            // Saving attachment with URL
            const uploadTask = projectStorage
            .ref(`news-images/${newsAnnouncement.attachment.name}`)
            .put(newsAnnouncement.attachment);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    projectStorage
                        .ref("news-images")
                        .child(newsAnnouncement.attachment.name)
                        .getDownloadURL()
                        .then(url => {
                            // Once image is saved to Firebase Storage and URL is available
                            firestore.collection('NewsAnnouncements').add({
                                heading: newsAnnouncement.heading,
                                body: newsAnnouncement.body,
                                attachmentURL: url,
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
export const editAnnouncement = (newsEdits) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();

        // If poster has decided to include an attachment
        if (newsEdits.attachment) {
            // Saving attachment with URL
            const uploadTask = projectStorage
            .ref(`news-images/${newsEdits.attachment.name}`)
            .put(newsEdits.attachment);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    projectStorage
                        .ref("news-images")
                        .child(newsEdits.attachment.name)
                        .getDownloadURL()
                        .then(url => {
                            // Once image is saved to Firebase Storage and URL is available
                            // Referencing announcement's ID for merging changes
                            if (newsEdits.heading !== '') {
                                firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                                    heading: newsEdits.heading
                                }, { merge: true });
                            } else if (newsEdits.body !== '') {
                                firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                                    body: newsEdits.body
                                }, { merge: true });
                            }
                            firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                                attachmentURL: url
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
            } else if (newsEdits.body !== '') {
                firestore.collection('NewsAnnouncements').doc(newsEdits.announcementID).set({
                    body: newsEdits.body
                }, { merge: true });
            }
            dispatch({type: 'UPDATE_ANNOUNCEMENT', payload: newsEdits});
        }

    }
}

// announcementID is the ID of the post passed and used to reference the deletion
export const deleteAnnouncement = (announcementID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('NewsAnnouncements').doc(announcementID).delete().then(() => {
            dispatch({type: 'DELETE_ANNOUNCEMENT'});
        }).catch((error) => {
            dispatch({type: 'DELETE_ANNOUNCEMENT_ERROR', error});
        });
    }
}