import {
    ORDER_REQUEST,
    CREATE_ORDER,
    GET_ORDER,
    GET_ORDERS,
    ORDER_ERROR,
    ORDER_PAID,
    UPDATE_REQUEST,
    ORDER_RESET,
    UPDATE_ERROR,
} from "../constants/orderConstants";

const initialState = {
    loading: false,
    createdOrder: {},
    details: {},
    list: [],
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

        case UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                paid: false,
                delivered: false,
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

        case ORDER_PAID:
            return {
                ...state,
                paid: true,
                loading: false,
            }

        case UPDATE_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            }

        case ORDER_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            }

        case ORDER_RESET:
            return {
                ...state,
                loading: false,
                list: [],
                details: {},
            }

        default:
            return state;
    }
}

export default orderReducer;