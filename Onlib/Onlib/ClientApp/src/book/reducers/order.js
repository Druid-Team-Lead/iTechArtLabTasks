import * as ActionTypes from '../actions';

const initialState = {
    isOrderCreated: false,

    orders: [],
    isOrdersLoading: false,
    isOrdersLoaded: false,

    currentOrder: null,
    isOrderLoading: false,
    isOrderLoaded: false,

    error: null
};

export const order = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ORDER_REQUEST: {
            return {
                ...state,
                isOrderCreated: false
            }
        }
        case ActionTypes.ORDER_SUCCESS: {
            return {
                ...state,
                isOrderCreated: true
            }
        }
        case ActionTypes.ORDER_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        case ActionTypes.ORDERS_REQUEST: {
            return {
                ...state,
                isOrdersLoading: true
            }
        }
        case ActionTypes.ORDERS_SUCCESS: {
            return {
                ...state,
                orders: action.response,
                isOrdersLoading: false,
                isOrdersLoaded: true
            }
        }
        case ActionTypes.ORDERS_FAILURE: {
            return {
                ...state,
                isOrdersLoading: false,
                isOrdersLoaded: false,
                error: action.error
            }
        }
        case ActionTypes.GET_ORDER_REQUEST: {
            return {
                ...state,
                currentOrder: null,
                isOrderLoading: true
            }
        }
        case ActionTypes.GET_ORDER_SUCCESS: {
            return {
                ...state,
                currentOrder: action.response,
                isOrderLoading: false,
                isOrderLoaded: true
            }
        }
        case ActionTypes.GET_ORDER_FAILURE: {
            return {
                ...state,
                isOrderLoading: false,
                isOrderLoaded: false,
                currentOrder: null,
                error: action.error
            }
        }
        default:
            return state;
    }
};