import * as types from '../actions/types';

const listsReducer = (state = { isFetching: false, shoppinglists: [] }, action) => {
    switch (action.type) {
    case types.CREATE_LIST_REQUEST:
    case types.VIEW_ALL_LISTS_REQUEST:
    case types.VIEW_LIST_REQUEST:
    case types.DELETE_LIST_REQUEST:
        return {
            ...state,
            isFetching: true,
        };

    case types.CREATE_LIST_SUCCESS:
    case types.CREATE_LIST_FAILURE:
    case types.EDIT_LIST_SUCCESS:
    case types.EDIT_LIST_FAILURE:
    case types.DELETE_LIST_SUCCESS:
    case types.DELETE_LIST_FAILURE:
    case types.VIEW_ALL_LISTS_FAILURE:
        return {
            ...state,
            isFetching: false,
        };

    case types.VIEW_LIST_SUCCESS:
        return {
            ...state,
            listName: action.response.data.name,
            isFetching: false,
        };

    case types.VIEW_ALL_LISTS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            shoppinglists: action.response.data.lists,
        };

    default:
        return state;
    }
};

export default listsReducer;
