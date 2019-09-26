import * as ActionTypes from '../actions';

const initialState = {
    books: [],
    isLoading: true,
    forceReload: false
};

export const reducer = (state = initialState, action) => {

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
        case ActionTypes.BOOKS_FAILURE: {
            return {
                ...state,
                //books: Object.assign({}, action.book),
                forceReload: true
            }
        }
        default:
            return state;
    }
};