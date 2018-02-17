import { DISPLAY_SNACK_BAR, DISMISS_SNACK_BAR } from './types';

/**
 * @param message - string to display once an
 * action has been executed
 */
export const displaySnackBar = message => ({
    type: DISPLAY_SNACK_BAR,
    message,
});

/**
 * Executed once a snackbar is dismissed,
 * closed prematurely, or has timed out
 */
export const dismissSnackbar = () => ({
    type: DISMISS_SNACK_BAR,
});
