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

export const signupUser = credentials => (dispatch) => {
    dispatch(signupRequest());
    return instance
        .post('/auth/register', credentials)
        .then((response) => {
            dispatch(signupSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((err) => {
            dispatch(signupFailure(err));
            dispatch(displaySnackBar(err.response.data.message));
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

export const loginUser = credentials => (dispatch) => {
    dispatch(loginRequest());
    return instance
        .post('/auth/login', credentials)
        .then((response) => {
            dispatch(loginSuccess(response));
            dispatch(displaySnackBar(response.data.message));
            setAuthToken(response.data.token);
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

export const logoutUser = () => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(logoutRequest());
    return instance
        .post('/auth/logout')
        .then((resp) => {
            dispatch(logoutSuccess(resp));
            dispatch(displaySnackBar(resp.data.message));
            deleteAuthToken();
        })
        .catch((err) => {
            dispatch(logoutFailure(err));
            dispatch(displaySnackBar(err.response.data.message));
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

export const resetUserPassword = credentials => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(resetPasswordRequest());

    return instance
        .post('/auth/reset-password', credentials)
        .then((response) => {
            dispatch(resetPasswordSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((errResponse) => {
            dispatch(resetPasswordFailure(errResponse));
            dispatch(displaySnackBar(errResponse.response.data.message));
        });
};
