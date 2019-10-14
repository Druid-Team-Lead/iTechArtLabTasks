import { CALL_API } from '../../middleware/apiMiddleware'

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

export const ORDERS_REQUEST = 'ORDERS_REQUEST'
export const ORDERS_REQUEST = 'ORDERS_REQUEST'
export const ORDERS_REQUEST = 'ORDERS_REQUEST'

const fetchBooks = () => ({
    [CALL_API]: {
        types: [ORDERS_REQUEST, ORDERS_REQUEST, ORDERS_REQUEST],
        endpoint: 'Book/GetOrders'
    }
});

export const orderOperations = {
    makeOrder: (bookId, userId) => async (dispatch, getState) => {
        return dispatch(putOrder(bookId, userId))
    },
    loadOrders: () => async (dispatch, getState) => {
        return dispatch(fetchBooks());
    },
}