import { RECEIVEBOOKS, REQUESTBOOKS } from '../actions'

const initialState = { books: [], isLoading: true };

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === REQUESTBOOKS) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVEBOOKS) {
        return {
            ...state,
            books: action.books,
            isLoading: false
        };
    }

    return state;
};