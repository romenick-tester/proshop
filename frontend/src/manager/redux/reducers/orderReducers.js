import {
    ORDER_REQUEST,
    CREATE_ORDER,
    GET_ORDER,
    GET_ORDERS,
    ORDER_ERROR,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_ERROR,
    ORDER_PAY_RESET,
} from "../constants/orderConstants";

const orderInitialState = {
    loading: false,
    createdOrder: {},
    details: {},
    list: [],
    error: null,
}

const orderReducer = (state = orderInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_ORDER:
        case GET_ORDERS:
        case CREATE_ORDER:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            }

        case ORDER_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            }

        default:
            return state;
    }
}

const payInitialState = {
    loading: false,
    error: null,
    paid: false,
    delivered: false,
    result: {},
}

const payReducer = (state = payInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                paid: true,
                result: payload,
            }

        case ORDER_PAY_ERROR:
            return {
                ...state,
                loading: false,
                paid: false,
                result: {},
                error: payload,
            }

        case ORDER_PAY_RESET:
            return {
                ...state,
                loading: false,
                paid: false,
                result: {},
                error: null,
            }

        default:
            return state;
    }
}

export { orderReducer, payReducer };