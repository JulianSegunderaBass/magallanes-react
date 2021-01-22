// Page for News Updates

import React from 'react';
// Page Components
import NewsList from '../components/for-news/NewsList';
import { motion } from 'framer-motion';
import { pageLoad } from '../assets/Animations';
// Importing Auto Scroll component
import AutoScroll from '../assets/AutoScroll';
// Redux Connection
import { useSelector } from 'react-redux';

const NewsPage = () => {
    const announcements = useSelector((state) => state.NewsAnnouncements.newsAnnouncements);
    return (
        <motion.div 
            variants={pageLoad} 
            initial="hidden" 
            animate="show" 
            exit="exit"
        >
            <NewsList newsItems={announcements} />
        </motion.div>
    )
}

export default NewsPage;