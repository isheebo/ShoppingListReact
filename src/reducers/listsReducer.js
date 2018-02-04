import * as types from '../actions/types';

const listsReducer = (state = { isFetching: false }, action) => {
    switch (action.type) {
    case types.CREATE_LIST_REQUEST:
    case types.VIEW_ALL_LISTS_REQUEST:
        return Object.assign(
            {},
            {
                isFetching: true,
            },
        );

    case types.CREATE_LIST_SUCCESS:
        return Object.assign(
            {},
            {
                isFetching: false,
            },
        );

    case types.CREATE_LIST_FAILURE:
        return Object.assign(
            {},
            {
                isFetching: false,
            },
        );

    default:
        return state;
    }
};

export default listsReducer;
