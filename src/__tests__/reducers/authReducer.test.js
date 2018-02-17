import * as types from '../../actions/types';
import authReducer from '../../reducers/authReducer';

describe('authReducer', () => {
    const initialState = {
        isFetching: false,
        isAuthenticated: false,
    };

    it('test signup request', () => {
        const action = { type: types.SIGNUP_REQUEST };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: true,
        });
    });

    it('test login request', () => {
        const action = { type: types.LOGIN_REQUEST };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: true,
        });
    });

    it('test password reset request', () => {
        const action = { type: types.PASSWORD_RESET_REQUEST };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: true,
        });
    });

    it('test logout request', () => {
        const action = { type: types.LOGOUT_REQUEST };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: true,
        });
    });

    it('test signup success', () => {
        const action = { type: types.SIGNUP_SUCCESS };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
        });
    });

    it('test login success', () => {
        const action = { type: types.LOGIN_SUCCESS };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
            isAuthenticated: true,
        });
    });

    it('test password reset success', () => {
        const action = { type: types.PASSWORD_RESET_SUCCESS };

        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
            isAuthenticated: true,
        });
    });

    it('test signup failure', () => {
        const action = { type: types.SIGNUP_FAILURE };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
        });
    });

    it('test login failure', () => {
        const action = { type: types.LOGIN_FAILURE };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
        });
    });

    it('test password reset failure', () => {
        const action = { type: types.PASSWORD_RESET_FAILURE };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
        });
    });

    it('test logout success', () => {
        const action = { type: types.LOGOUT_SUCCESS };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
            isAuthenticated: false,
        });
    });

    it('test logout failure', () => {
        const action = { type: types.LOGOUT_FAILURE };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: false,
        });
    });

    it('returns default state', () => {
        expect(authReducer(initialState, {})).toEqual(initialState);
    });
});
