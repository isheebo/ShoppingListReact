import * as types from '../../actions/types';
import * as snackbarActions from '../../actions/snackbarActions';

describe('Snackbar Actions', () => {
    const message = 'List displayed successfully';
    it('test display snackbar', () => {
        expect(snackbarActions.displaySnackBar(message)).toEqual({
            type: types.DISPLAY_SNACK_BAR,
            message,
        });
    });

    it('test dismiss snackbar', () => {
        expect(snackbarActions.dismissSnackbar()).toEqual({
            type: types.DISMISS_SNACK_BAR,
        });
    });
});
