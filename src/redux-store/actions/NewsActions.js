// The Actions for News Announcements (dispatch to NewsReducer)

// newsAnnouncement parameter is the new entry submitted via dispatch from component
export const createAnnouncement = (newsAnnouncement) => {
    return ({type: 'CREATE_ANNOUNCEMENT', payload: newsAnnouncement});
}