// The Actions for News Announcements (dispatch to NewsReducer)

// newsAnnouncement parameter is the new entry submitted via dispatch from component
export const createAnnouncement = (newsAnnouncement) => {
    // Extra function to run before dispatching to reducer
    // "Pausing" the dispatch to run asynchronous code
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // Make async call to database
        // Reference to database
        const firestore = getFirestore();
        // Accessing "NewsAnnouncements" collection from Firestore
        firestore.collection('NewsAnnouncements').add({
            // Spreading out the Announcement's properties
            ...newsAnnouncement,
            createdAt: new Date()
        }).then(() => {
            // Only dispatch the action when data is ready
            // Payload represents the news announcement and its properties
            dispatch({type: 'CREATE_ANNOUNCEMENT', payload: newsAnnouncement});
        }).catch((error) => {
            // Dispatch action indicating error if data can't load
            dispatch({type: 'CREATE_ANNOUNCEMENT_ERROR', error});
        });
    }
}