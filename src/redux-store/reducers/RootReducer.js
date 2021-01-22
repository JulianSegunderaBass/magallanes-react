// This Root Reducer combines the other reducers into one group

import NewsReducer from './NewsReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    NewsAnnouncements: NewsReducer
});

export default RootReducer;