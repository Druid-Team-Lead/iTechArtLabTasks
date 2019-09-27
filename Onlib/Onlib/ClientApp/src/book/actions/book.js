import { CALL_API } from '../../middleware/api'

export const BOOKS_REQUEST = 'BOOKS_REQUEST'
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS'
export const BOOKS_FAILURE = 'BOOKS_FAILURE'

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST'
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS'
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE'


const fetchBooks = () => ({
    [CALL_API]: {
        types: [BOOKS_REQUEST, BOOKS_SUCCESS, BOOKS_FAILURE],
        endpoint: 'Book/GetBooks'
    }
});

const postBook = (newBook) => ({
    [CALL_API]: {
        types: [ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE],
        endpoint: 'Book/AddBook',
        body: JSON.stringify(newBook)
    }
})

export const bookOperations = {
    loadBooks: () => async (dispatch, getState) => {
        return dispatch(fetchBooks());
    },
    uploadBook: (newBook) => async (dispatch, getState) => {
        return dispatch(postBook(newBook))
    }
}