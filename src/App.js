// The Root App component which renders the pages and global components

import React from 'react';
// Importing Pages
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';
import NewsPage from './pages/NewsPage';
import NewsForm from './pages/NewsForm';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
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

function App() {

    const currentLocation = useLocation();

    return (
        // React Router is not very specific with paths. 
        // Use Switch Component.
        // Note: The Navbar and Footer stay constant on all paths
        <div className="App">
            <GlobalStyle />
            <SideNav />
            {/* Wrapping the Switch with Animate Presence */}
            {/* exitBeforeEnter says to wait until current component 
            is closed before animating the next component */}
            <AnimatePresence exitBeforeEnter>
                {/* location and pathname needed for Animate Presence */}
                <Switch 
                    location={currentLocation} 
                    key={currentLocation.pathname} 
                >
                    <Route path="/" exact>
                        <Landing />
                    </Route>
                    <Route path="/faq" exact>
                        <FAQ />
                    </Route>
                    <Route path="/news" exact>
                        <NewsPage />
                    </Route>
                    <Route path="/create-news-announcement" exact>
                        <NewsForm />
                    </Route>
                    <Route path="/sign-in" exact>
                        <SignIn />
                    </Route>
                    <Route path="/sign-up" exact>
                        <SignUp />
                    </Route>
                </Switch>
            </AnimatePresence>
            <Footer />
        </div>
    );
}

export default App;
