import { CALL_API } from '../../middleware/api' 

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

//export const ADD_BOOK = 'ADD_BOOK';


const fetchBooks = () => ({
    [CALL_API]: {
        types: [ BOOKS_REQUEST, BOOKS_SUCCESS, BOOKS_FAILURE ],
        endpoint: `Book/GetBooks`
    }
});

export const bookOperations = {
    loadBooks: () => async (dispatch, getState) => {
        return dispatch(fetchBooks());
    }
}
/*
const actionCreators = {
    requestBooks: () => async (dispatch, getState) => {
        dispatch({
            type: REQUESTBOOKS, meta: {
                type: 'api',
                url: 'Book/GetBooks'
            }
        });

        const url = `api/Book/GetBooks`;
        const response = await fetch(url);
        const books = await response.json();

        dispatch({ type: RECEIVEBOOKS, payload: books);
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
*/