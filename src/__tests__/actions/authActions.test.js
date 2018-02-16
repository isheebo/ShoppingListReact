import * as types from '../../actions/types';
import * as authActions from '../../actions/authActions';

describe('authActions', () => {
    describe('signup user', () => {
        const credentials = {
            email: 'abc@example.org',
            password: 'password',
            confirmPassword: 'password',
        };

        const response = {};

        it('tests signup request', () => {
            expect(authActions.signupRequest(credentials)).toEqual({
                type: types.SIGNUP_REQUEST,
                credentials,
            });
        });

        it('tests signup success', () => {
            expect(authActions.signupSuccess(response)).toEqual({
                type: types.SIGNUP_SUCCESS,
                response,
            });
        });

        it('tests signup failure', () => {
            expect(authActions.signupFailure(response)).toEqual({
                type: types.SIGNUP_FAILURE,
                response,
            });
        });
    });

    describe('login user', () => {
        const credentials = {
            email: 'abc@example.org',
            password: 'password',
        };
        const response = {};

        it('tests login user request', () => {
            expect(authActions.loginRequest(credentials)).toEqual({
                type: types.LOGIN_REQUEST,
                credentials,
            });
        });

        it('tests login success action', () => {
            expect(authActions.loginSuccess(response)).toEqual({
                type: types.LOGIN_SUCCESS,
                response,
            });
        });

        it('tests login failure', () => {
            expect(authActions.loginFailure(response)).toEqual({
                type: types.LOGIN_FAILURE,
                response,
            });
        });
    });

    describe('tests reset password request', () => {
        const response = {};
        it('sends a reset password request', () => {
            expect(authActions.resetPasswordRequest()).toEqual({
                type: types.PASSWORD_RESET_REQUEST,
            });
        });

        it('tests reset password success', () => {
            expect(authActions.resetPasswordSuccess(response)).toEqual({
                type: types.PASSWORD_RESET_SUCCESS,
                response,
            });
        });

        it('test reset password failure', () => {
            expect(authActions.resetPasswordFailure(response)).toEqual({
                type: types.PASSWORD_RESET_FAILURE,
                response,
            });
        });
    });

    describe('logout user', () => {
        const response = {};

        it('send logout request', () => {
            expect(authActions.logoutRequest()).toEqual({
                type: types.LOGOUT_REQUEST,
            });
        });

        it('tests successful logout', () => {
            expect(authActions.logoutSuccess(response)).toEqual({
                type: types.LOGOUT_SUCCESS,
                response,
            });
        });

        it('test logout failure', () => {
            expect(authActions.logoutFailure(response)).toEqual({
                type: types.LOGOUT_FAILURE,
                response,
            });
        });
    });
});
