// The Root App component which renders the pages and global components

import React from 'react';
// Importing Pages
import Landing from './pages/Landing';
// Importing Footer
import Footer from './components/global/Footer';
// Importing Global Styling
import GlobalStyle from './assets/GlobalStyle';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <Landing />
            <Footer />
        </div>
    );
}

export default App;
