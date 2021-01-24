// Importing from Firebase NPM install
// We only need imports from core functionality and app
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBRmrqnqcNcnXzeS9-cpeecHGmLt6KgQ3U",
    authDomain: "magallanes-react.firebaseapp.com",
    projectId: "magallanes-react",
    storageBucket: "magallanes-react.appspot.com",
    messagingSenderId: "457879947670",
    appId: "1:457879947670:web:d3bc54851cacb424a1b5b7",
    measurementId: "G-S808R0S3MS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Initializing Firestore
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;