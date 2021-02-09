// The Actions for News Announcements (dispatch to NewsReducer)
import firebase from 'firebase/app';
import 'firebase/storage';

// newsAnnouncement parameter is the new entry submitted via dispatch from component
export const createAnnouncement = (newsAnnouncement) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const projectStorage = firebase.storage();

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
                            firestore.collection('NewsAnnouncements').add({
                                heading: newsAnnouncement.heading,
                                body: newsAnnouncement.body,
                                attachmentURL: url,
                                createdAt: new Date()
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
                createdAt: new Date()
            }).then(() => {
                dispatch({type: 'CREATE_ANNOUNCEMENT', payload: newsAnnouncement});
            }).catch((error) => {
                dispatch({type: 'CREATE_ANNOUNCEMENT_ERROR', error});
            });
        }

    }
}