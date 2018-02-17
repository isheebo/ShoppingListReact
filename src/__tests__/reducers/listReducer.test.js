import * as types from '../../actions/types';
import listsReducer from '../../reducers/listsReducer';

describe('lists Reducer', () => {
    const state = {
        isFetching: false,
        shoppinglists: [],
    };

    it('create list request', () => {
        expect(listsReducer(state, { type: types.CREATE_LIST_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('view all lists request', () => {
        expect(listsReducer(state, { type: types.VIEW_ALL_LISTS_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('delete list request', () => {
        expect(listsReducer(state, { type: types.DELETE_LIST_REQUEST })).toEqual({
            ...state,
            isFetching: true,
        });
    });

    it('create list success', () => {
        expect(listsReducer(state, { type: types.CREATE_LIST_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('create list failure', () => {
        expect(listsReducer(state, { type: types.CREATE_LIST_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('edit list failure', () => {
        expect(listsReducer(state, { type: types.EDIT_LIST_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('view list failure', () => {
        expect(listsReducer(state, { type: types.VIEW_LIST_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('view list success', () => {
        const action = {
            type: types.VIEW_LIST_SUCCESS,
            response: {
                data: {
                    name: 'groceries',
                },
            },
        };

        expect(listsReducer(
            state,

            action,
        )).toEqual({
            ...state,
            isFetching: false,
            listName: action.response.data.name,
        });
    });

    it('edit list success', () => {
        expect(listsReducer(state, { type: types.EDIT_LIST_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('delete list failure', () => {
        expect(listsReducer(state, { type: types.DELETE_LIST_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('delete list success', () => {
        expect(listsReducer(state, { type: types.DELETE_LIST_SUCCESS })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('view all lists failure', () => {
        expect(listsReducer(state, { type: types.VIEW_ALL_LISTS_FAILURE })).toEqual({
            ...state,
            isFetching: false,
        });
    });

    it('view all lists success', () => {
        const action = {
            type: types.VIEW_ALL_LISTS_SUCCESS,
            response: {
                data: {
                    lists: {},
                },
            },
        };
        expect(listsReducer(state, action)).toEqual({
            ...state,
            isFetching: false,
            shoppinglists: action.response.data.lists,
        });
    });

    it('returns default state', () => {
        expect(listsReducer(state, {})).toEqual(state);
    });
});
