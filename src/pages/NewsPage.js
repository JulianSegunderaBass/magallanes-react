// Page for News Updates

// Functional Imports
import React from 'react';
import { useSelector } from 'react-redux';
// Component Imports
import NewsList from '../components/for-news/NewsList';
import AutoScroll from '../assets/AutoScroll';
// Data + Image Imports
// Animation Imports
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
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