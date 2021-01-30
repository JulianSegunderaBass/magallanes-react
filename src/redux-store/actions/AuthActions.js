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