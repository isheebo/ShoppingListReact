import * as types from '../../actions/types';
import * as itemActions from '../../actions/itemActions';

describe('itemActions', () => {
    describe('create item', () => {
        const response = {};
        const listID = 102;
        const itemData = {};

        it('test create item request', () => {
            expect(itemActions.createItemRequest(listID, itemData)).toEqual({
                type: types.CREATE_ITEM_REQUEST,
                listID,
                itemData,
            });
        });

        it('test create item is successful', () => {
            expect(itemActions.createItemSuccess(response)).toEqual({
                type: types.CREATE_ITEM_SUCCESS,
                response,
            });
        });

        it('test create item fails', () => {
            expect(itemActions.createItemFailure(response)).toEqual({
                type: types.CREATE_ITEM_FAILURE,
                response,
            });
        });
    });

    describe('edit item', () => {
        const response = {};
        const listID = 102;
        const itemID = 11;
        const itemData = {};

        it('test edit item request', () => {
            expect(itemActions.editItemRequest(listID, itemID, itemData)).toEqual({
                type: types.EDIT_ITEM_REQUEST,
                listID,
                itemID,
                itemData,
            });
        });

        it('test edit item success', () => {
            expect(itemActions.editItemSuccess(response)).toEqual({
                type: types.EDIT_ITEM_SUCCESS,
                response,
            });
        });

        it('test edit item fails', () => {
            expect(itemActions.editItemFailure(response)).toEqual({
                type: types.EDIT_ITEM_FAILURE,
                error: response,
            });
        });
    });

    describe('delete item', () => {
        const response = {};
        const listID = 102;
        const itemID = 11;

        it('test delete item request', () => {
            expect(itemActions.deleteItemRequest(listID, itemID)).toEqual({
                type: types.DELETE_ITEM_REQUEST,
                listID,
                itemID,
            });
        });

        it('test delete item is successful', () => {
            expect(itemActions.deleteItemSuccess(response)).toEqual({
                type: types.DELETE_ITEM_SUCCESS,
                response,
            });
        });

        it('test delete item fails', () => {
            expect(itemActions.deleteItemFailure(response)).toEqual({
                type: types.DELETE_ITEM_FAILURE,
                error: response,
            });
        });
    });

    describe('view all items', () => {
        const listID = 102;

        it('test view items request', () => {
            expect(itemActions.viewAllItemsRequest(listID)).toEqual({
                type: types.VIEW_ALL_ITEMS_REQUEST,
                listID,
            });
        });

        it('test view items success', () => {
            expect(itemActions.viewAllItemsSuccess()).toEqual({
                type: types.VIEW_ALL_ITEMS_SUCCESS,
            });
        });

        it('test view items fails', () => {
            expect(itemActions.viewAllItemsFailure()).toEqual({
                type: types.VIEW_ALL_ITEMS_FAILURE,
            });
        });
    });
});
