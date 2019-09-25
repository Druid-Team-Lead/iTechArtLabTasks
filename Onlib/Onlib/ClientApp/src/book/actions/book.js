export const REQUESTBOOKS = 'REQUEST_BOOKS';
export const RECEIVEBOOKS = 'RECEIVE_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';

export const actionCreators = {
    requestBooks: () => async (dispatch, getState) => {

        dispatch({ type: REQUESTBOOKS });

        const url = `api/Book/GetBooks`;
        const response = await fetch(url);
        const books = await response.json();

        dispatch({ type: RECEIVEBOOKS, books });
    },
    addBook: book => async (dispatch, getState) => {
        console.log(book);
        const url = 'api/Book/AddBook';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({ type: ADD_BOOK, book });
    }
};