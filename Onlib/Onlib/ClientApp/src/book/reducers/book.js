import * as ActionTypes from '../actions';

const initialState = {
    books: [],
    isBooksLoading: true,
    isAddingLoading: false,
    isOrderCreated: false,
    currentBook: {},
    error: null
};

export const book = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.BOOKS_REQUEST: {
            return {
                ...state,
                isBooksLoading: true,
                currentBook: {}
            };
        }
        case ActionTypes.BOOKS_SUCCESS: {
            return {
                ...state,
                books: action.response,
                isBooksLoading: false
            };
        }
        case ActionTypes.ADD_BOOK_REQUEST: {
            return {
                ...state,
                isAddingLoading: true,
                error: null
            };
        }
        case ActionTypes.ADD_BOOK_SUCCESS: {
            return {
                ...state,
                isAddingLoading: false,
            }
        }
        case ActionTypes.ADD_BOOK_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        case ActionTypes.BOOK_REQUEST: {
            return {
                ...state,
                isBooksLoading: true
            }
        }
        case ActionTypes.BOOK_SUCCESS: {
            return {
                ...state,
                currentBook: action.response,
                isBooksLoading: false
            }
        }
        case ActionTypes.ORDER_REQUEST: {
            return {
                ...state,
                isOrderCreated: false
            }
        }
        case ActionTypes.ORDER_SUCCESS: {
            return {
                ...state,
                isOrderCreated: true
            }
        }
        case ActionTypes.ORDER_REQUEST: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
};