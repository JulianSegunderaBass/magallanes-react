// Reducer for authentication

import { store } from 'react-notifications-component';

const initState = {
    authError: null,
    attemptedEmail: null,
    signingIn: false,
    creatingAccount: false,
    settingProfileImage: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error');
            store.addNotification({
                title: "Authentication Error",
                message: `Login failed: ${action.payload.error.message}`,
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
                authError: action.payload.error.message,
                attemptedEmail: action.payload.attemptedEmail
            }
        case 'LOGGING_IN':
            console.log('Logging in...');
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
                message: "Please check your email to verify your account.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 6000,
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
                    duration: 6000,
                    onScreen: true
                }
            });
            return state;
        case 'RESET_PASSWORD_ERROR':
            console.log('Failed to Send Reset Email');
            store.addNotification({
                title: "Failed to Send Reset Email",
                message: action.error.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: true
                }
            });
            return {
                ...state,
                authError: action.error.message
            }
        case 'VERIFY_EMAIL':
            console.log('Verification Email Sent');
            store.addNotification({
                title: "Verification Email Sent",
                message: "Please check your inbox.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: true
                }
            });
            return state;
        case 'VERIFY_EMAIL_ERROR':
            console.log('Failed to Send Verification Email');
            store.addNotification({
                title: "Failed to Send Verification Email",
                message: action.error.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: true
                }
            });
            return {
                ...state,
                authError: action.error.message
            }
        case 'SETTING_PROFILE_IMAGE':
            console.log('Setting profile image...');
            store.addNotification({
                title: "Saving Image...",
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
                settingProfileImage: true
            }
        case 'PROFILE_IMAGE_SET':
            console.log('Profile Image has been set');
            store.addNotification({
                title: "Success",
                message: "Profile Image has been set.",
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
                settingProfileImage: false
            }
        case 'PROFILE_IMAGE_ERROR':
            console.log('Profile Image has not been set');
            store.addNotification({
                title: "Error",
                message: action.error.message,
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