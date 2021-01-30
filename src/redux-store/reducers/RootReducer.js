// This Root Reducer combines the other reducers into one group

import AuthReducer from './AuthReducer';
import NewsReducer from './NewsReducer';
import { combineReducers } from 'redux';
// Importing special Firebase Firestore Reducer
import { firestoreReducer } from 'redux-firestore';
// For Authentication Services
import { firebaseReducer } from 'react-redux-firebase';

const RootReducer = combineReducers({
    NewsAnnouncements: NewsReducer,
    // Premade reducer that connects with firestore
    firestore: firestoreReducer,
    // For syncing auth status with state
    firebase: firebaseReducer,
    auth: AuthReducer
});

export default RootReducer;