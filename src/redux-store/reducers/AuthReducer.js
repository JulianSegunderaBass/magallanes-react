// Reducer for authentication

import { store } from 'react-notifications-component';

const initState = {
    // Using this to display errors if they come up
    authError: null,
    signingIn: false,
    creatingAccount: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error');
            store.addNotification({
                title: "Authentication Error",
                message: `Login failed: ${action.error.message}`,
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
        case 'LOGGING_IN':
            console.log('Logging in...');
            // Setting authError to null because there is no error
            store.addNotification({
                title: "Signing you in...",
                message: "Give us some time.",
                type: "warning",
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
                signingIn: true
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success');
            // Setting authError to null because there is no error
            store.addNotification({
                title: "Authentication Success",
                message: "You are now logged in.",
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
                authError: null,
                signingIn: false
            }
        case 'SIGNOUT_SUCCESS':
            console.log("Signout success");
            store.addNotification({
                title: "Authentication Success",
                message: "You have logged out",
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
        case 'CREATING_ACCOUNT':
            console.log('Creating your account...');
            store.addNotification({
                title: "Creating your account...",
                message: "Give us some time.",
                type: "warning",
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
                creatingAccount: true
            }
        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            store.addNotification({
                title: "Authentication Success",
                message: "Signup successful. You are now logged in.",
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
                authError: null,
                creatingAccount: false
            }
        case 'SIGNUP_ERROR':
            console.log('Signup error');
            store.addNotification({
                title: "Signup Error",
                message: `Signup failed: ${action.error.message}`,
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
        case 'RESET_PASSWORD':
            console.log('Password Reset Email Sent');
            store.addNotification({
                title: "Password Reset Email Sent",
                message: "Please check your inbox.",
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
        case 'RESET_PASSWORD_ERROR':
            console.log('Failed to Send Reset Email');
            store.addNotification({
                title: "Failed to Send Reset Email",
                message: action.error.message,
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
                authError: action.error.message
            }
        default:
            return state;
    }
}

export default AuthReducer;