// The Root App component which renders the pages and global components

import React from 'react';
// Importing Pages
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';
import NewsPage from './pages/NewsPage';
import NewsForm from './pages/NewsForm';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ProfilePage from './pages/ProfilePage';
// Importing Footer
import Footer from './components/global/Footer';
// Importing Side Navigation
import SideNav from './components/global/navigation/SideNav';
// Importing Global Styling
import GlobalStyle from './assets/GlobalStyle';
// Router Imports
import { Switch, Route, useLocation } from 'react-router-dom';
// Importing Animations
// Animate Presence helps React detect when a component
// is removed from the tree - exit animations
// Also requires "useLocation" from React Router Dom
import { AnimatePresence } from 'framer-motion';
// Redux Functions
import { useSelector } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {

    const currentLocation = useLocation();

    const auth = useSelector((state) => state.firebase.auth);

    return (
        // React Router is not very specific with paths. 
        // Use Switch Component.
        // Note: The Navbar and Footer stay constant on all paths
        <div className="App">
            <GlobalStyle />
            <SideNav />
            <ReactNotification />
            {/* Wrapping the Switch with Animate Presence */}
            {/* exitBeforeEnter says to wait until current component 
            is closed before animating the next component */}
            {/* location and pathname needed for Animate Presence */}
            <Switch 
                location={currentLocation} 
                key={currentLocation.pathname} 
            >
                <Route path="/" component={Landing} exact />
                <Route path="/faq" component={FAQ} exact />
                <Route path="/news" component={NewsPage} exact />
                {/* Route Guarding using unique authentication ID */}
                <Route path="/create-news-announcement" component={NewsForm} exact />
                <Route path="/sign-in" component={SignIn} exact />
                <Route path="/sign-up" component={SignUp} exact />
                <Route path="/my-profile" component={ProfilePage} exact />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
