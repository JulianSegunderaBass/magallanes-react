// Reducer holding state for News Announcements

import { store } from 'react-notifications-component';

const initState = {
    newsAnnouncements: [
        {id: '1', heading: 'A new website is up', body: 'A website designed and developed by APC students for Barangay Magallanes is now up and running.'},
        {id: '2', heading: 'New website uses React and Firebase', body: 'The APC Team has implemented a Firebase database for the website.'},
        {id: '3', heading: 'Other features planned to be released for website.', body: 'Newer features are currently under development for the Barangay Information Site.'}
    ],
    newsAnnouncementError: null
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
                newsAnnouncementError: null
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
                newsAnnouncementError: null
            }
        default:
            return state;
    }
}

export default NewsReducer;