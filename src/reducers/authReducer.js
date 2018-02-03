import * as types from '../actions/types';

/**
 * Reducers manage independent parts of the state tree
 * reducers work in such a way that they take
 *
 * (prevState,action) => newState
 *
 * The reason is the same: to keep reducers self-sufficient and reusable.
 *
 * Does it matter what we have in the initial state, credentials is not
 * included?
 */

const authReducer = (
    state = {
        isFetching: false,
        isAuthenticated: false,
    },
    action,
) => {
    switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.LOGIN_REQUEST:
    case types.PASSWORD_RESET_REQUEST:
    case types.LOGOUT_REQUEST:
        return Object.assign(
            {},
            {
                isFetching: true,
            },
        );

    case types.SIGNUP_SUCCESS:
        return Object.assign(
            {},
            {
                isFetching: false,
            },
        );

    case types.LOGIN_SUCCESS:
    case types.PASSWORD_RESET_SUCCESS:
        /**
             * on successful login, we should trigger a state change.
             * and the user should be authenticated.
             *
             * after a successful password reset, we may want to redirect
             * the home page... and proceed and redirect the user to the homepage.
             * It is similar to an action login action
             *
             */
        return Object.assign(
            {},
            {
                isFetching: false,
                isAuthenticated: true,
            },
        );

    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.PASSWORD_RESET_FAILURE:
        return Object.assign(
            {},
            {
                isFetching: false,
            },
        );

    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
        /**
             * on successful logout, a user's token has to be deleted and hence
             * they are done away with. In other words, we un-authenticate them.
             * Once logout fails, a user has to login again, there is a chance
             * that the token had already expired and hence cannot be reused.
             * therefore,
             * A user has to relogin to access the app
             */
        return Object.assign(
            {},
            {
                isAuthenticated: false,
                isFetching: false,
            },
        );

    default:
        return state;
    }
};

export default authReducer;
