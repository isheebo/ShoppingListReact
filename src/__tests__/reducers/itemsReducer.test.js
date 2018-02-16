import * as types from '../../actions/types';
import itemsReducer from '../../reducers/itemsReducer';

describe('itemsReducer', () => {
    const state = { isFetching: false, selectedShoppingList: {}, shoppinglists: [] };

    it('creates item request', () => {
        expect(itemsReducer(state, { type: types.CREATE_ITEM_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('view all items request', () => {
        expect(itemsReducer(state, { type: types.VIEW_ALL_ITEMS_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('edit item request', () => {
        expect(itemsReducer(state, { type: types.EDIT_ITEM_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('delete item request', () => {
        expect(itemsReducer(state, { type: types.DELETE_ITEM_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('create item success', () => {
        expect(itemsReducer(state, { type: types.CREATE_ITEM_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('create item failure', () => {
        expect(itemsReducer(state, { type: types.CREATE_ITEM_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('edit item success', () => {
        expect(itemsReducer(state, { type: types.EDIT_ITEM_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('edit item failure', () => {
        expect(itemsReducer(state, { type: types.EDIT_ITEM_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('delete item failure', () => {
        expect(itemsReducer(state, { type: types.DELETE_ITEM_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('delete item success', () => {
        expect(itemsReducer(state, { type: types.DELETE_ITEM_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('selects shoppinglist', () => {
        const action = { type: types.SELECTED_LIST, payload: {} };
        expect(itemsReducer(state, action)).toEqual({
            ...state,
            selectedShoppingList: action.payload,
        });
    });

    it('view all items success', () => {
        const action = {
            type: types.VIEW_ALL_ITEMS_SUCCESS,
            response: {
                data: {
                    items: [],
                },
            },
        };

        expect(itemsReducer(state, action)).toEqual({
            ...state,
            isFetching: false,
            items: action.response.data.items,
        });
    });

    it('returns default state', () => {
        expect(itemsReducer(state, {})).toEqual(state);
    });
});
