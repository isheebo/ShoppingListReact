import instance from '../utils/instance';
import * as types from './types';
import { displaySnackBar } from './snackbarActions';
import { getAuthToken } from '../utils/tokenUtils';

/**
 * Defines an action that will be executed when sending
 * a create list request
 * @param {object} newListData (listName, notifymeDate)
 */
const createListRequest = newListData => ({
    type: types.CREATE_LIST_REQUEST,
    newListData,
});

/**
 * Defines an action that will be executed once a
 * shopping list has been created
 * @param {Response} response object from the server
 */
const createListSuccess = response => ({
    type: types.CREATE_LIST_SUCCESS,
    response,
});

/**
 * Defines an action that will be executed once shopping
 * list creation fails
 * @param {Response} response object from the server
 */
const createListFailure = response => ({
    type: types.CREATE_LIST_FAILURE,
    response,
});

/**
 * @desc an action creator for adding a new shopping list
 * @param {object} newListData - contains the list name and
 * its corresponding notify date
 */
export const createShoppingList = newListData => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(createListRequest(newListData));
    return instance
        .post('/shoppinglists', newListData)
        .then((response) => {
            dispatch(createListSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((err) => {
            dispatch(createListFailure(err));
            dispatch(displaySnackBar(err.response.data.message));
        });
};

/**
 * @desc response from the server
 * @param {Response} response
 */
const viewAllListsRequest = () => ({
    type: types.VIEW_ALL_LISTS_REQUEST,
});

/**
 * @desc response from the server
 * @param {Response} response
 */
const viewAllListsSuccess = response => ({
    type: types.VIEW_ALL_LISTS_SUCCESS,
    response,
});

/**
 * @desc response from the server
 * @param {Response} response
 */
const viewAllListsFailure = response => ({
    type: types.VIEW_ALL_LISTS_FAILURE,
    response,
});

/**
 * @desc returns all shopping lists that are owned by
 * the currently logged in user
 */
export const viewAllLists = () => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewAllListsRequest());
    return instance
        .get('/shoppinglists')
        .then((response) => {
            dispatch(viewAllListsSuccess(response));
        })
        .catch((err) => {
            dispatch(viewAllListsFailure(err));
        });
};

/**
 * View one list
 */
const viewOneListRequest = listData => ({
    type: types.VIEW_LIST_REQUEST,
    listData,
});

const viewOneListSuccess = response => ({
    type: types.VIEW_LIST_SUCCESS,
    response,
});

const viewOneListFailure = error => ({
    type: types.VIEW_LIST_FAILURE,
    error,
});

/**
 * Get one shoppinglist from the server
 * @param id - ID of the list to return
 */
export const viewOneList = id => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewOneListRequest(id));
    return instance
        .get(`/shoppinglists/${id}`)
        .then((response) => {
            dispatch(viewOneListSuccess(response));
        })
        .catch((error) => {
            dispatch(viewOneListFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};

/**
 * Edit a shoppinglist
 */
const editListRequest = (id, newListParams) => ({
    type: types.EDIT_LIST_REQUEST,
    id,
    newListParams,
});

const editListSuccess = response => ({
    type: types.EDIT_LIST_SUCCESS,
    response,
});

const editListFailure = response => ({
    type: types.EDIT_LIST_FAILURE,
    response,
});

/**
 * Edit  current shoppinglist, given the ID of the shoppinglist, id
 * and the newListData
 */
export const editShoppingList = (id, newListParams) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(editListRequest(id, newListParams));

    return instance
        .put(`shoppinglists/${id}`, newListParams)
        .then((response) => {
            dispatch(editListSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((error) => {
            dispatch(editListFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};

/**
 * Delete shopping list
 */

const deleteListRequest = id => ({
    type: types.DELETE_LIST_REQUEST,
    id,
});

const deleteListSuccess = response => ({
    type: types.DELETE_LIST_SUCCESS,
    response,
});

const deleteListFailure = response => ({
    type: types.DELETE_LIST_FAILURE,
    response,
});

/**
 * @param id - the ID of the list to be deleted
 */
export const deleteShoppingList = id => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(deleteListRequest(id));
    return instance
        .delete(`shoppinglists/${id}`)
        .then((response) => {
            dispatch(deleteListSuccess(response));
            dispatch(displaySnackBar('List deleted successfully'));
        })
        .catch((error) => {
            dispatch(deleteListFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};
