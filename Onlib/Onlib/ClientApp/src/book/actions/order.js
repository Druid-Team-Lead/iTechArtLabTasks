import { CALL_API } from '../../middleware/apiMiddleware'

export const ORDER_REQUEST = 'ORDER_REQUEST'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAILURE = 'ORDER_FAILURE'

const putOrder = (bookId, userId) => ({
    [CALL_API]: {
        types: [ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE],
        endpoint: "Order/MakeOrder",
        body: JSON.stringify({bookId, userId})
    }
})

export const ORDERS_REQUEST = 'ORDERS_REQUEST'
export const ORDERS_SUCCESS = 'ORDERS_SUCCESS'
export const ORDERS_FAILURE = 'ORDERS_FAILURE'

const fetchOrders = (userId) => ({
    [CALL_API]: {
        types: [ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE],
        endpoint: `Order/GetOrders/${userId}`
    }
});

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE'

const fetchOrder = (boodId, userId) => ({
    [CALL_API]: {
        types: [GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE],
        endpoint: `Order/GetOrderOrReceive/${boodId}/${userId}`
    }
})

export const orderOperations = {
    makeOrder: (bookId, userId) => async (dispatch, getState) => {
        return dispatch(putOrder(bookId, userId))
    },
    loadOrders: (userId) => async (dispatch, getState) => {
        return dispatch(fetchOrders(userId));
    },
    getOrder: (bookId, userId) => async (dispatch, getState) => {
        return dispatch(fetchOrder(bookId, userId));
    },
}