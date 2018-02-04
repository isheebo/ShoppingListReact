import instance from '../utils/instance';
import * as types from './types';
import { displaySnackBar } from './snackbarActions';
import { getAuthToken } from '../utils/tokenUtils';

/**
 * Adding a new item
 */
export const addItemRequest = itemData => ({
    type: types.CREATE_ITEM_REQUEST,
    itemData,
});

export const addItemSuccess = response => ({
    type: types.CREATE_ITEM_SUCCESS,
    response,
});

export const addItemFailure = response => ({
    type: types.CREATE_ITEM_FAILURE,
    response,
});

/**
 * @description Adds a new item to the shoppinglist specified by ID
 * @param {object} itemData
 */
export const addNewItem = itemData => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(addItemRequest(itemData));
    return instance
        .post(`/shoppinglists/${itemData.listID}/items`, itemData)
        .then((response) => {
            dispatch(addItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((response) => {
            dispatch(addItemFailure(response));
            dispatch(displaySnackBar(response.response.data.message));
        });
};

/**
 * Viewing all items in one shoppinglist
 */

export const viewAllItemsRequest = listID => ({
    type: types.VIEW_ALL_ITEMS_REQUEST,
    listID,
});

export const viewAllItemsSuccess = response => ({
    type: types.VIEW_ALL_ITEMS_SUCCESS,
    response,
});

export const viewAllItemsFailure = error => ({
    type: types.VIEW_ALL_ITEMS_FAILURE,
    error,
});

/**
 * @param listID - the ID of the shoppinglist
 * @returns all items in shoppinglist with ID `listID`
 */
export const viewAllItemsInList = listID => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewAllItemsRequest(listID));
    return instance
        .get(`/shoppinglists/${listID}/items`)
        .then((response) => {
            dispatch(viewAllItemsSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((error) => {
            dispatch(viewAllItemsFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};

/**
 * View one Item in the shoppinglist
 * @param itemData
 */
export const viewOneItemRequest = itemData => ({
    type: types.VIEW_ITEM_REQUEST,
    itemData,
});

export const viewOneItemSuccess = response => ({
    type: types.VIEW_ITEM_SUCCESS,
    response,
});

export const viewOneItemFailure = response => ({
    type: types.VIEW_ITEM_FAILURE,
    response,
});

export const viewOneItem = itemData => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewOneItemRequest(itemData));
    return instance
        .get(`/shoppinglists/${itemData.listID}/items/${itemData.itemID}`)
        .then((response) => {
            dispatch(viewOneItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((err) => {
            dispatch(viewOneItemFailure(err));
            dispatch(displaySnackBar(err.response.data.message));
        });
};

/**
 * Editing an Item
 */
const editItemRequest = params => ({
    type: types.EDIT_ITEM_REQUEST,
    params,
});

const editItemSuccess = response => ({
    type: types.EDIT_ITEM_SUCCESS,
    response,
});

const editItemFailure = error => ({
    type: types.EDIT_ITEM_FAILURE,
    error,
});

export const editItem = params => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(editItemRequest(params));
    return instance
        .put(`/shoppinglists/${params.listID}/items/${params.itemID}`)
        .then((response) => {
            dispatch(editItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((error) => {
            dispatch(editItemFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};

/**
 * Deleting an Item
 */
const deleteItemRequest = params => ({
    type: types.DELETE_ITEM_REQUEST,
    params,
});

const deleteItemSuccess = response => ({
    type: types.DELETE_ITEM_SUCCESS,
    response,
});

const deleteItemFailure = error => ({
    type: types.DELETE_ITEM_FAILURE,
    error,
});

export const deleteItem = params => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(deleteItemRequest(params));
    return instance
        .delete(`/shoppinglists/${params.listID}/items/${params.itemID}`)
        .then((response) => {
            dispatch(deleteItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((error) => {
            dispatch(deleteItemFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};
