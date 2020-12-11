// The Root App component which renders the pages and global components

import React from 'react';
// Importing Pages
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';
// Importing Footer
import Footer from './components/global/Footer';
// Importing Nav
import Nav from './components/global/Nav';
// Importing Global Styling
import GlobalStyle from './assets/GlobalStyle';
// Router Imports
import { Switch, Route, useLocation } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <Nav />
            <Switch>
                <Route path="/" exact>
                    <Landing />
                </Route>
                <Route path="/faq" exact>
                    <FAQ />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
