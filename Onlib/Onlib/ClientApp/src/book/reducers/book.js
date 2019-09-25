import { RECEIVEBOOKS, REQUESTBOOKS, ADD_BOOK } from '../actions';

const initialState = {
    books: [],
    isLoading: true,
    forceReload: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case REQUESTBOOKS: {
            return {
                ...state,
                isLoading: true
            };
        }
        case RECEIVEBOOKS: {
            return {
                ...state,
                books: action.books,
                isLoading: false
            };
        }
        case ADD_BOOK: {
            return {
                ...state,
                books: Object.assign({}, action.book),
                forceReload: true
            }
        }
        default:
            return state;
    }
};