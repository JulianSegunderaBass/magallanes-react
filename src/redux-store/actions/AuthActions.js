// Actions for users authenticating (signing in / out, setting profile image)

// Functional Imports
import sha256 from 'crypto-js/sha256';

const CryptoJS = require("crypto-js");

// Signing In User
export const signInUser = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        dispatch({type: 'LOGGING_IN'});
        firebase.auth().signInWithEmailAndPassword( // Part of authentication service
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((error) => {
            dispatch({type: 'LOGIN_ERROR', payload: {error, attemptedEmail: credentials.email}});
        });
    }
}

// Signing Out User
export const signOutUser = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => { // Part of authentication service
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}

// Signing Up User
export const signUpUser = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // Communicating between Firebase Auth service and Firestore users collection
        const firebase = getFirebase();
        const firestore = getFirestore();
        dispatch({type: 'CREATING_ACCOUNT'});

        firebase.auth().createUserWithEmailAndPassword( // Step 1: create new user in auth service
            newUser.email,
            newUser.password
        ).then((response) => { // Step 2: create user record in collection
            // response has information about the user we just created
            // Note: if this collection doesn't exist, it will be created automatically
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                createdAt: new Date(),
                currentBenefits: {
                    benefit_1: 'Test Benefit 1',
                    benefit_2: 'Test Benefit 2',
                    benefit_3: 'Test Benefit 3'
                }
            });
        }).then(() => { // Step 3: dispatching successful signup action
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch(error => {
            dispatch({type: 'SIGNUP_ERROR', error});
        });
    }
}

// For changing password from profile page
export const resetPass = (email) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().sendPasswordResetEmail(email).then(() => { // Sending an email to logged user to reset password
            dispatch({type: 'RESET_PASSWORD'});
        }).catch(error => {
            dispatch({type: 'RESET_PASSWORD_ERROR', error});
        });
    }
}

// For changing profile photo from profile page
export const setProfileImage = (profilePhoto, userID, previousPhotoURL) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const projectStorage = firebase.storage();
        const dt = new Date();
        dispatch({type: 'SETTING_PROFILE_IMAGE'});

        // Hashing Variables
        let imgHashObj = sha256(`${profilePhoto.name}${dt.toLocaleDateString()}${dt.toLocaleTimeString()}`);
        let imgHashStr = imgHashObj.toString(CryptoJS.enc.Base64);

        const uploadTask = projectStorage.ref(`profile-images/${imgHashStr}`).put(profilePhoto);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                projectStorage.ref("profile-images").child(imgHashStr).getDownloadURL().then(url => {
                    if (previousPhotoURL) {
                        var prevPhotoReference = projectStorage.refFromURL(previousPhotoURL);
                        prevPhotoReference.delete();
                    }
                    firestore.collection('users').doc(userID).set({
                        profileImageURL: url
                    }, { merge: true });
                }).then(() => {
                    dispatch({type: 'PROFILE_IMAGE_SET'});
                }).catch(error => {
                    dispatch({type: 'PROFILE_IMAGE_ERROR', error});
                })
            }
        )
    }
}