import * as types from '../../actions/types';
import snackBarReducer from '../../reducers/snackBarReducer';

describe('snackBar Reducer', () => {
    const initialState = { isSnackBarActive: false, snackMessage: '' };

    it('test display snackbar', () => {
        const action = { type: types.DISPLAY_SNACK_BAR };
        expect(snackBarReducer(initialState, action)).toEqual({
            ...initialState,
            isSnackBarActive: true,
            snackMessage: action.message,
        });
    });

    it('test dismiss snackbar', () => {
        const action = { type: types.DISMISS_SNACK_BAR };
        expect(snackBarReducer(initialState, action)).toEqual({
            ...initialState,
            isSnackBarActive: false,
        });
    });

    it('with initial state', () => {
        expect(snackBarReducer({}, {})).toEqual({});
    });
});
