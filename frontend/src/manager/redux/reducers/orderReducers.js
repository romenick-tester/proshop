import {
    ORDER_REQUEST,
    CREATE_ORDER,
    GET_ORDER,
    GET_ORDERS,
    ORDER_ERROR,
    ORDER_PAID,
    ORDER_RESET,
} from "../constants/orderConstants";

const initialState = {
    loading: false,
    createdOrder: {},
    details: {},
    list: [],
    orderPay: {},
    error: null,
}

const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ORDER_PAID:
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
                loading: false,
                error: payload
            }

        case ORDER_RESET:
            return {
                ...state,
                loading: false,
                list: [],
                details: {},
                orderPay: {}
            }

        default:
            return state;
    }
}

export default orderReducer;