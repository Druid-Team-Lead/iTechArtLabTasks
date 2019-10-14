import { CALL_API } from '../../middleware/apiMiddleware'

export const BOOKS_REQUEST = 'BOOKS_REQUEST'
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS'
export const BOOKS_FAILURE = 'BOOKS_FAILURE'

const fetchBooks = () => ({
    [CALL_API]: {
        types: [BOOKS_REQUEST, BOOKS_SUCCESS, BOOKS_FAILURE],
        endpoint: 'Book/GetBooks'
    }
});

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST'
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS'
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE'

const postBook = (newBook) => ({
    [CALL_API]: {
        types: [ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE],
        endpoint: 'Book/AddBook',
        body: JSON.stringify(newBook)
    }
})

export const BOOK_REQUEST = 'BOOK_REQUEST'
export const BOOK_SUCCESS = 'BOOK_SUCCESS'
export const BOOK_FAILURE = 'BOOK_FAILURE'

const fetchBook = (id) => ({
    [CALL_API]: {
        types: [BOOK_REQUEST, BOOK_SUCCESS, BOOK_FAILURE],
        endpoint: `Book/GetBook/${id}`
    }
})

export const ORDER_REQUEST = 'ORDER_REQUEST'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAILURE = 'ORDER_FAILURE'

const putOrder = (bookId, userId) => ({
    [CALL_API]: {
        types: [ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE],
        endpoint: "Book/Order",
        body: JSON.stringify({bookId, userId})
    }
})

export const bookOperations = {
    loadBooks: () => async (dispatch, getState) => {
        return dispatch(fetchBooks());
    },
    uploadBook: (newBook) => async (dispatch, getState) => {
        return dispatch(postBook(newBook))
    },
    loadBook: (id) => async (dispatch, getState) => {
        return dispatch(fetchBook(id))
    },
    makeOrder: (bookId, userId) => async (dispatch, getState) => {
        return dispatch(putOrder(bookId, userId))
    },
}