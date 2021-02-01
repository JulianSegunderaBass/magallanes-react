// Reducer for authentication

const initState = {
    // Using this to display errors if they come up
    authError: null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error');
            // Attaching error message to auth state
            return {
                ...state,
                authError: action.error.message
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success');
            // Setting authError to null because there is no error
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log("Signout success");
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Signup error');
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state;
    }
}

export default AuthReducer;