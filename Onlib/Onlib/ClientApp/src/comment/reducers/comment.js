import * as ActionTypes from '../actions';

const initialState = {
    comments: [],
    isLoading: true,
    bookId: null,
    error: null
};

export const comment = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.COMMENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.COMMENTS_SUCCESS: {
            return {
                ...state,
                comments: action.response,
                isLoading: false
            };
        }
        case ActionTypes.ADD_COMMENT_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionTypes.ADD_COMMENT_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }
        case ActionTypes.ADD_COMMENT_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state;
    }
};