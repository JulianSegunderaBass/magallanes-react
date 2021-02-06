import { store } from 'react-notifications-component';

// Reducer for authentication

const initState = {
    // Using this to display errors if they come up
    authError: null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error');
            store.addNotification({
                title: "Authentication",
                message: "Login failed.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            // Attaching error message to auth state
            return {
                ...state,
                authError: action.error.message
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success');
            // Setting authError to null because there is no error
            store.addNotification({
                title: "Authentication",
                message: "Login successful!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log("Signout success");
            store.addNotification({
                title: "Authentication",
                message: "Logout successful!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            store.addNotification({
                title: "Authentication",
                message: "Signup successful!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Signup error');
            store.addNotification({
                title: "Signup",
                message: "An error has occured. Please try again.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state;
    }
}

export default AuthReducer;