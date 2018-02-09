import * as types from '../actions/types';

const listsReducer = (state = { isFetching: false, shoppinglists: [] }, action) => {
    switch (action.type) {
    case types.CREATE_LIST_REQUEST:
    case types.VIEW_ALL_LISTS_REQUEST:
    case types.VIEW_LIST_REQUEST:
    case types.EDIT_ITEM_REQUEST:
        return {
            ...state,
            isFetching: true,
        };

    case types.CREATE_LIST_SUCCESS:
        return {
            ...state,
            isFetching: false,
        };

    case types.CREATE_LIST_FAILURE:
        return {
            ...state,
            isFetching: false,
        };

    case types.VIEW_ALL_LISTS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            shoppinglists: action.response.data.lists,
        };

    case types.VIEW_ALL_LISTS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
};

export default listsReducer;
