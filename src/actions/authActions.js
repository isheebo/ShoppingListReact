import instance from '../utils/instance';
import * as types from './types';
import { displaySnackBar } from './snackbarActions';
import { getAuthToken, deleteAuthToken, setAuthToken } from '../utils/tokenUtils';

//  Registering a user

export const signupRequest = () => ({
    type: types.SIGNUP_REQUEST,
});

export const signupSuccess = response => ({
    type: types.SIGNUP_SUCCESS,
    response,
});

export const signupFailure = response => ({
    type: types.SIGNUP_FAILURE,
    response,
});

export const signupUser = (credentials, history) => (dispatch) => {
    dispatch(signupRequest(credentials));
    return instance
        .post('/auth/register', credentials)
        .then((response) => {
            dispatch(signupSuccess(response));
            dispatch(displaySnackBar(response.data.message));
            history.push('/login');
        })
        .catch((err) => {
            dispatch(signupFailure(err));
            dispatch(displaySnackBar(err && err.response.data.message));
        });
};

// Logging in

export const loginRequest = () => ({
    type: types.LOGIN_REQUEST,
});

// on successful login, a token is generated
export const loginSuccess = response => ({
    type: types.LOGIN_SUCCESS,
    response,
});

// display error
export const loginFailure = response => ({
    type: types.LOGIN_FAILURE,
    response,
});

export const loginUser = (credentials, history) => (dispatch) => {
    dispatch(loginRequest());
    return instance
        .post('/auth/login', credentials)
        .then((response) => {
            dispatch(loginSuccess(response));
            dispatch(displaySnackBar(response.data.message));
            setAuthToken(response.data.token);
            history.push('/dashboard');
        })
        .catch((response) => {
            dispatch(loginFailure(response));
            dispatch(displaySnackBar(response.response.data.message));
        });
};

//  Logging out

export const logoutRequest = () => ({
    type: types.LOGOUT_REQUEST,
});

export const logoutSuccess = response => ({
    type: types.LOGOUT_SUCCESS,
    response,
});

export const logoutFailure = response => ({
    type: types.LOGOUT_FAILURE,
    response,
});

export const logoutUser = history => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(logoutRequest());
    return instance
        .post('/auth/logout')
        .then((resp) => {
            dispatch(logoutSuccess(resp));
            dispatch(displaySnackBar(resp.data.message));
            history.push('/login');
            deleteAuthToken(); // go to the login page
        })
        .catch((err) => {
            dispatch(logoutFailure(err));
        });
};

// Resetting Passwords

export const resetPasswordRequest = () => ({
    type: types.PASSWORD_RESET_REQUEST,
});

export const resetPasswordSuccess = response => ({
    type: types.PASSWORD_RESET_SUCCESS,
    response,
});

export const resetPasswordFailure = response => ({
    type: types.PASSWORD_RESET_FAILURE,
    response,
});

export const resetUserPassword = (credentials, history) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(resetPasswordRequest());

    return instance
        .post('/auth/reset-password', credentials)
        .then((response) => {
            dispatch(resetPasswordSuccess(response));
            dispatch(displaySnackBar(response.data.message));
            history.push('/dashboard');
        })
        .catch((errResponse) => {
            dispatch(resetPasswordFailure(errResponse));
            dispatch(displaySnackBar(errResponse.response.data.message));
        });
};
