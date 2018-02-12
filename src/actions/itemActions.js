import instance from '../utils/instance';
import * as types from './types';
import { displaySnackBar } from './snackbarActions';
import { getAuthToken } from '../utils/tokenUtils';

/**
 * Adding a new item
 * Requires a valid shopping list ID
 * @param {number} ID, shopping list ID
 * @param {FormData} itemData, formdata for an item
 */
const createItemRequest = (listID, itemData) => ({
    type: types.CREATE_ITEM_REQUEST,
    listID,
    itemData,
});

/** Includes the server's response on success */
const createItemSuccess = response => ({
    type: types.CREATE_ITEM_SUCCESS,
    response,
});

/** Includes the server's response on failure */
const createItemFailure = response => ({
    type: types.CREATE_ITEM_FAILURE,
    response,
});

/**
 * @description Adds a new item to the shoppinglist specified by ID
 * @param {object} itemData
 */
export const createNewItem = (listID, itemData) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(createItemRequest(listID, itemData));
    return instance
        .post(`/shoppinglists/${listID}/items`, itemData)
        .then((response) => {
            dispatch(createItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((response) => {
            dispatch(createItemFailure(response));
            dispatch(displaySnackBar(response.response.data.message));
        });
};

/**
 * Viewing all items in one shoppinglist
 */

const viewAllItemsRequest = listID => ({
    type: types.VIEW_ALL_ITEMS_REQUEST,
    listID,
});

const viewAllItemsSuccess = response => ({
    type: types.VIEW_ALL_ITEMS_SUCCESS,
    response,
});

const viewAllItemsFailure = error => ({
    type: types.VIEW_ALL_ITEMS_FAILURE,
    error,
});

/**
 * @param listID - the ID of the shoppinglist
 * @returns all items in shoppinglist with ID `listID`
 */
export const viewAllItemsInList = (listID, history) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewAllItemsRequest(listID));
    return instance
        .get(`/shoppinglists/${listID}/items`)
        .then((response) => {
            dispatch(viewAllItemsSuccess(response));
            history.push(`/items/${listID}`);
        })
        .catch((error) => {
            dispatch(viewAllItemsFailure(error));
        });
};

/**
 * View one Item in the shopping list
 * @param{number} itemID, ID of the item in the shopping list
 * @param {number} listID, ID of a shopping list
 */
const viewOneItemRequest = (listID, itemID) => ({
    type: types.VIEW_ITEM_REQUEST,
    itemID,
    listID,
});

const viewOneItemSuccess = response => ({
    type: types.VIEW_ITEM_SUCCESS,
    response,
});

const viewOneItemFailure = response => ({
    type: types.VIEW_ITEM_FAILURE,
    response,
});

export const viewOneItem = (listID, itemID) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(viewOneItemRequest(listID, itemID));
    return instance
        .get(`/shoppinglists/${listID}/items/${itemID}`)
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
const editItemRequest = (listID, itemID, itemData) => ({
    type: types.EDIT_ITEM_REQUEST,
    listID,
    itemID,
    itemData,
});

const editItemSuccess = response => ({
    type: types.EDIT_ITEM_SUCCESS,
    response,
});

const editItemFailure = error => ({
    type: types.EDIT_ITEM_FAILURE,
    error,
});

export const editItem = (listID, itemID, itemData) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(editItemRequest(listID, itemID, itemData));
    return instance
        .put(`/shoppinglists/${listID}/items/${itemID}`, itemData)
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
 * Deleting an Item, itemID from a shoppinglist with ID, listID
 */
const deleteItemRequest = (listID, itemID) => ({
    type: types.DELETE_ITEM_REQUEST,
    listID,
    itemID,
});

const deleteItemSuccess = response => ({
    type: types.DELETE_ITEM_SUCCESS,
    response,
});

const deleteItemFailure = error => ({
    type: types.DELETE_ITEM_FAILURE,
    error,
});

export const deleteItem = (listID, itemID) => (dispatch) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
    dispatch(deleteItemRequest(listID, itemID));
    return instance
        .delete(`/shoppinglists/${listID}/items/${itemID}`)
        .then((response) => {
            dispatch(deleteItemSuccess(response));
            dispatch(displaySnackBar(response.data.message));
        })
        .catch((error) => {
            dispatch(deleteItemFailure(error));
            dispatch(displaySnackBar(error.response.data.message));
        });
};
