const requestBooks = 'REQUEST_BOOKS';
const receiveBooks = 'RECEIVE_BOOKS';
const initialState = { books: [], isLoading: false };

export const actionCreators = {
    requestBooks: () => async (dispatch, getState) => {

        dispatch({ type: requestBooks });

        const url = `api/Book/GetBooks`;
        const response = await fetch(url);
        const books = await response.json();

        dispatch({ type: receiveBooks, books });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestBooks) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveBooks) {
        return {
            ...state,
            books: action.books,
            isLoading: false
        };
    }

    return state;
};