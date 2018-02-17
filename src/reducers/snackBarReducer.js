import * as types from '../actions/types';

const snackBarReducer = (
    state = { isSnackBarActive: false, snackMessage: '' },
    action,
) => {
    switch (action.type) {
    case types.DISPLAY_SNACK_BAR:
        return {
            ...state,
            isSnackBarActive: true,
            snackMessage: action.message,
        };

    case types.DISMISS_SNACK_BAR:
        return {
            ...state,
            isSnackBarActive: false,
            snackMessage: '',
        };

    default:
        return state;
    }
};

export default snackBarReducer;
