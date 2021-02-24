// Reducer holding state for News Announcements

import { store } from 'react-notifications-component';

const initState = {
    newsAnnouncementError: null,
    publishingAnnouncement: false
}

const NewsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_ANNOUNCEMENT':
            console.log('Created Announcement: ', action.payload);
            store.addNotification({
                title: "News Announcement Created",
                message: "This announcement is now viewable on the News Reports Page",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                newsAnnouncementError: null,
                publishingAnnouncement: false
            }
        case 'CREATE_ANNOUNCEMENT_ERROR':
            console.log('Create announcement error', action.error);
            store.addNotification({
                title: "Failed to Create Announcement",
                message: action.error.message,
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
            return {
                ...state,
                newsAnnouncementError: action.error.message
            }
        case 'PUBLISHING_ANNOUNCEMENT':
            console.log("Publishing Announcement");
            store.addNotification({
                title: "Uploading Announcement...",
                message: "Give us some time.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                publishingAnnouncement: true
            }
        case 'DELETE_ANNOUNCEMENT':
            console.log('Announcement Deleted');
            store.addNotification({
                title: "News Announcement Deleted",
                message: "",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                newsAnnouncementError: null
            }
        case 'DELETE_ANNOUNCEMENT_ERROR':
            console.log('Problem deleting announcement', action.error);
            store.addNotification({
                title: "Failed to Delete Announcement",
                message: action.error.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return {
                ...state,
                newsAnnouncementError: action.error.message
            }
        case 'UPDATE_ANNOUNCEMENT':
            console.log('Updated Announcement: ', action.payload);
            store.addNotification({
                title: "News Announcement Updated",
                message: "These edits are now viewable on the News Reports Page",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                newsAnnouncementError: null,
                publishingAnnouncement: false
            }
        default:
            return state;
    }
}

export default NewsReducer;