import * as ActionTypes from '../actions';

const initialState = {
    books: [],
    isLoading: true,
    forceReload: false,
    currentBook: {}
};

export const book = (state = initialState, action) => {

    console.log("book reducer: ");
    console.log(action);

    switch (action.type) {
        case ActionTypes.BOOKS_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.BOOKS_SUCCESS: {
            return {
                ...state,
                books: action.response,
                isLoading: false
            };
        }
        case ActionTypes.ADD_BOOK_SUCCESS: {
            return {
                ...state,
                books: Object.assign({}, action.book),
                forceReload: true
            }
        }
        case ActionTypes.BOOK_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionTypes.BOOK_SUCCESS: {
            return {
                ...state,
                currentBook: action.response
            }
        }
        default:
            return state;
    }
};