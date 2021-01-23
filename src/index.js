import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importing React Router Dom
import { BrowserRouter } from 'react-router-dom';
// Redux Library Imports
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Redux Reducers
import RootReducer from './redux-store/reducers/RootReducer';
// Firebase Library Imports
import firebase from 'firebase/app';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { reactReduxFirebase, ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
// Firebase Config Import
import FirebaseConfig from './config/FirebaseConfig';

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

// Some clunky Firebase code
const reactReduxFirebaseProps = {
    firebase,
    config: FirebaseConfig,
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
