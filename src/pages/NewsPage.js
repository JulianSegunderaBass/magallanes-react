// Page for News Updates

import React from 'react';
// Page Components
import NewsList from '../components/for-news/NewsList';
// Animations
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
// Importing Auto Scroll component
import AutoScroll from '../assets/AutoScroll';
// Redux Connection
import { useSelector } from 'react-redux';
// Firestore Imports
import { firestoreConnect } from 'react-redux-firebase';

const NewsPage = () => {
    const announcements = useSelector((state) => state.firestore.ordered.NewsAnnouncements);
    return (
        <motion.div 
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            <AutoScroll />
            <NewsList newsItems={announcements} />
        </motion.div>
    )
}

// Older, funky code for Firestore connection
// Ordering announcements according to time
export default firestoreConnect([
    {collection: 'NewsAnnouncements', orderBy: ['createdAt', 'desc']}
])(NewsPage);