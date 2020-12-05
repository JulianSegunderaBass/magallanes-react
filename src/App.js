// The Root App component which renders the pages and global components

import React from 'react';
// Importing Pages
import Landing from './pages/Landing';
// Importing Global Styling
import GlobalStyle from './assets/GlobalStyle';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <Landing />
        </div>
    );
}

export default App;
