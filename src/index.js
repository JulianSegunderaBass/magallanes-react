
// Functional Imports
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Component Imports
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RootReducer from './redux-store/reducers/RootReducer';
// Firebase Imports
import firebase from 'firebase/app';
import FirebaseConfig from './config/FirebaseConfig';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

// compose lets us add both devtools and thunk to the store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creating the Redux Store
const store = createStore(
    RootReducer, 
    composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        // Additional store enhancers inside compose
        reduxFirestore(firebase, FirebaseConfig)
    )
);
const config = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Some clunky Firebase code
const reactReduxFirebaseProps = {
    firebase,
    // config: FirebaseConfig,
    config,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
