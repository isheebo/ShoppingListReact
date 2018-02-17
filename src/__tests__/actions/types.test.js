import * as types from '../../actions/types';

describe('Action Types', () => {
    it('asserts that action names are action types', () => {
        expect(types.SIGNUP_REQUEST).toEqual('SIGNUP_REQUEST');
        expect(types.SIGNUP_SUCCESS).toEqual('SIGNUP_SUCCESS');
        expect(types.SIGNUP_FAILURE).toEqual('SIGNUP_FAILURE');

        expect(types.LOGIN_REQUEST).toEqual('LOGIN_REQUEST');
        expect(types.LOGIN_SUCCESS).toEqual('LOGIN_SUCCESS');
        expect(types.LOGIN_FAILURE).toEqual('LOGIN_FAILURE');

        expect(types.LOGOUT_REQUEST).toEqual('LOGOUT_REQUEST');
        expect(types.LOGOUT_SUCCESS).toEqual('LOGOUT_SUCCESS');
        expect(types.LOGOUT_FAILURE).toEqual('LOGOUT_FAILURE');

        expect(types.PASSWORD_RESET_REQUEST).toEqual('PASSWORD_RESET_REQUEST');
        expect(types.PASSWORD_RESET_SUCCESS).toEqual('PASSWORD_RESET_SUCCESS');
        expect(types.PASSWORD_RESET_FAILURE).toEqual('PASSWORD_RESET_FAILURE');

        expect(types.CREATE_LIST_REQUEST).toEqual('CREATE_LIST_REQUEST');
        expect(types.CREATE_LIST_SUCCESS).toEqual('CREATE_LIST_SUCCESS');
        expect(types.CREATE_LIST_FAILURE).toEqual('CREATE_LIST_FAILURE');

        expect(types.EDIT_LIST_REQUEST).toEqual('EDIT_LIST_REQUEST');
        expect(types.EDIT_LIST_SUCCESS).toEqual('EDIT_LIST_SUCCESS');
        expect(types.EDIT_LIST_FAILURE).toEqual('EDIT_LIST_FAILURE');

        expect(types.DELETE_LIST_REQUEST).toEqual('DELETE_LIST_REQUEST');
        expect(types.DELETE_LIST_SUCCESS).toEqual('DELETE_LIST_SUCCESS');
        expect(types.DELETE_LIST_FAILURE).toEqual('DELETE_LIST_FAILURE');

        expect(types.VIEW_ALL_LISTS_REQUEST).toEqual('VIEW_ALL_LISTS_REQUEST');
        expect(types.VIEW_ALL_LISTS_SUCCESS).toEqual('VIEW_ALL_LISTS_SUCCESS');
        expect(types.VIEW_ALL_LISTS_FAILURE).toEqual('VIEW_ALL_LISTS_FAILURE');

        expect(types.VIEW_ALL_ITEMS_REQUEST).toEqual('VIEW_ALL_ITEMS_REQUEST');
        expect(types.VIEW_ALL_ITEMS_SUCCESS).toEqual('VIEW_ALL_ITEMS_SUCCESS');
        expect(types.VIEW_ALL_ITEMS_FAILURE).toEqual('VIEW_ALL_ITEMS_FAILURE');

        expect(types.CREATE_ITEM_REQUEST).toEqual('CREATE_ITEM_REQUEST');
        expect(types.CREATE_ITEM_SUCCESS).toEqual('CREATE_ITEM_SUCCESS');
        expect(types.CREATE_ITEM_FAILURE).toEqual('CREATE_ITEM_FAILURE');

        expect(types.EDIT_ITEM_REQUEST).toEqual('EDIT_ITEM_REQUEST');
        expect(types.EDIT_ITEM_SUCCESS).toEqual('EDIT_ITEM_SUCCESS');
        expect(types.EDIT_ITEM_FAILURE).toEqual('EDIT_ITEM_FAILURE');

        expect(types.DELETE_ITEM_REQUEST).toEqual('DELETE_ITEM_REQUEST');
        expect(types.DELETE_ITEM_SUCCESS).toEqual('DELETE_ITEM_SUCCESS');
        expect(types.DELETE_ITEM_FAILURE).toEqual('DELETE_ITEM_FAILURE');

        expect(types.DISPLAY_SNACK_BAR).toEqual('DISPLAY_SNACK_BAR');
        expect(types.DISMISS_SNACK_BAR).toEqual('DISMISS_SNACK_BAR');
    });
});
