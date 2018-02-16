import * as types from '../../actions/types';
import * as listActions from '../../actions/listActions';

describe('listActions', () => {
    const newListData = {};
    const response = {};
    const listID = 13;

    describe('create shopping list', () => {
        it('test create list request', () => {
            expect(listActions.createListRequest(newListData)).toEqual({
                type: types.CREATE_LIST_REQUEST,
                newListData,
            });
        });

        it('test create list success', () => {
            expect(listActions.createListSuccess(response)).toEqual({
                type: types.CREATE_LIST_SUCCESS,
                response,
            });
        });

        it('test create list failure', () => {
            expect(listActions.createListFailure(response)).toEqual({
                type: types.CREATE_LIST_FAILURE,
                response,
            });
        });
    });

    describe('view all lists', () => {
        it('test view all lists request', () => {
            expect(listActions.viewAllListsRequest()).toEqual({
                type: types.VIEW_ALL_LISTS_REQUEST,
            });
        });

        it('test view all lists success', () => {
            expect(listActions.viewAllListsSuccess(response)).toEqual({
                type: types.VIEW_ALL_LISTS_SUCCESS,
                response,
            });
        });

        it('test view all lists failure', () => {
            expect(listActions.viewAllListsFailure(response)).toEqual({
                type: types.VIEW_ALL_LISTS_FAILURE,
                response,
            });
        });
    });

    describe('edit lists', () => {
        it('test edit list request', () => {
            expect(listActions.editListRequest(listID, newListData)).toEqual({
                type: types.EDIT_LIST_REQUEST,
                listID,
                newListData,
            });
        });

        it('test edit list success', () => {
            expect(listActions.editListSuccess(response)).toEqual({
                type: types.EDIT_LIST_SUCCESS,
                response,
            });
        });

        it('test edit list failure', () => {
            expect(listActions.editListFailure(response)).toEqual({
                type: types.EDIT_LIST_FAILURE,
                response,
            });
        });
    });

    describe('delete lists', () => {
        it('test delete list request', () => {
            expect(listActions.deleteListRequest(listID)).toEqual({
                type: types.DELETE_LIST_REQUEST,
                listID,
            });
        });

        it('test delete list success', () => {
            expect(listActions.deleteListSuccess(response)).toEqual({
                type: types.DELETE_LIST_SUCCESS,
                response,
            });
        });

        it('test delete list failure', () => {
            expect(listActions.deleteListFailure(response)).toEqual({
                type: types.DELETE_LIST_FAILURE,
                response,
            });
        });
    });
});
