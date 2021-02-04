// Reducer holding state for News Announcements

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
            return {
                ...state,
                newsAnnouncementError: null
            }
        case 'CREATE_ANNOUNCEMENT_ERROR':
            console.log('Create announcement error', action.error);
            return {
                ...state,
                newsAnnouncementError: action.error.message
            }
        default:
            return state;
    }
}

export default NewsReducer;