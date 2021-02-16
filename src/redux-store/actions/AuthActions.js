// Actions for users authenticating (signing in / out)

export const signInUser = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // Part of authentication service
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            // Note: No need to pass any data in this dispatch
            // Changes "authError" state to null (meaning there is no error)
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((error) => {
            // Changes "authError" state to an error message
            dispatch({type: 'LOGIN_ERROR', error});
        });
    }
}

export const signOutUser = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // Part of authentication service
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}

// For Signing Up
export const signUpUser = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // Communicating between Firebase Auth service 
        // and Firestore users collection
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            // Step 1: create new user in auth service
            newUser.email,
            newUser.password
        ).then((response) => {
            // Step 2: create user record in collection
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
        }).then(() => {
            // Step 3: dispatching successful signup action
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch(error => {
            dispatch({type: 'SIGNUP_ERROR', error});
        });
    }
}

// For changing password from profile page
export const resetPass = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // Reference to logged user's email
        const loggedEmail = getState().firebase.auth.email;

        // Sending an email to logged user to reset password
        firebase.auth().sendPasswordResetEmail(loggedEmail).then(() => {
            dispatch({type: 'RESET_PASSWORD'});
        }).catch(error => {
            dispatch({type: 'RESET_PASSWORD_ERROR', error});
        });
    }
}