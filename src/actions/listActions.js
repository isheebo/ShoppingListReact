import instance from '../utils/instance';
import * as types from './types';
import { displaySnackBar } from './snackbarActions';
import { getAuthToken } from '../utils/tokenUtils';

// create a shopping list
/**
 * Defines an action that will be executed when sending
 * a create list request
 * @param {object} newListData (listName, notifymeDate)
 */
export const createListRequest = newListData => ({
    type: types.CREATE_LIST_REQUEST,
    newListData,
});

/**
 * Defines an action that will be executed once a
 * shopping list has been created
 * @param {Response} response object from the server
 */
export const createListSuccess = response => ({
    type: types.CREATE_LIST_SUCCESS,
    response,
});

/**
 * Defines an action that will be executed once shopping
 * list creation fails
 * @param {Response} response object from the server
 */
export const createListFailure = response => ({
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
export const viewAllListsRequest = () => ({
    type: types.VIEW_ALL_LISTS_REQUEST,
});

/**
 * @desc response from the server
 * @param {Response} response
 */
export const viewAllListsSuccess = response => ({
    type: types.VIEW_ALL_LISTS_SUCCESS,
    response,
});

/**
 * @desc response from the server
 * @param {Response} response
 */
export const viewAllListsFailure = response => ({
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
            dispatch(viewAllListsSuccess());
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((err) => {
            dispatch(viewAllListsFailure());
            dispatch(displaySnackBar(err.response.data.message));
        });
};
