import * as types from '../actions/types';

const listsReducer = (state = { isFetching: false, shoppinglists: [] }, action) => {
    switch (action.type) {
    case types.CREATE_ITEM_REQUEST:
    case types.VIEW_ALL_ITEMS_REQUEST:
    case types.VIEW_ITEM_REQUEST:
    case types.EDIT_ITEM_REQUEST:
    case types.DELETE_ITEM_REQUEST:
        return {
            ...state,
            isFetching: true,
        };

    case types.CREATE_ITEM_SUCCESS:
    case types.CREATE_ITEM_FAILURE:
    case types.EDIT_ITEM_SUCCESS:
    case types.EDIT_ITEM_FAILURE:
    case types.DELETE_ITEM_SUCCESS:
    case types.DELETE_ITEM_FAILURE:
    case types.VIEW_ALL_ITEMS_FAILURE:
        return {
            ...state,
            isFetching: false,
        };

    case types.VIEW_ALL_ITEMS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            items: action.response.data.items,
        };

    default:
        return state;
    }
};

export default listsReducer;
