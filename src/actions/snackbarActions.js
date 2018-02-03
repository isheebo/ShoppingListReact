import { DISPLAY_SNACK_BAR, DISMISS_SNACK_BAR } from './types';

// Do actions have state? Like can I add, isSnackBarActive here? 🤔
export const displaySnackBar = message => ({
    type: DISPLAY_SNACK_BAR,
    message,
});

export const dismissSnackbar = () => ({
    type: DISMISS_SNACK_BAR,
});
