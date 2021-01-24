// This Root Reducer combines the other reducers into one group

import NewsReducer from './NewsReducer';
import { combineReducers } from 'redux';
// Importing special Firebase Firestore Reducer
import { firestoreReducer } from 'redux-firestore';

const RootReducer = combineReducers({
    NewsAnnouncements: NewsReducer,
    // Premade reducer that connects with firestore
    firestore: firestoreReducer
});

export default RootReducer;