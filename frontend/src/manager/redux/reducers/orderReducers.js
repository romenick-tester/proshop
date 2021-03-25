import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_ERROR,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_ERROR,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_ERROR,
    GET_ORDER_RESET,
    PAY_ORDER_RESET,
} from "../constants/orderConstants";

const orderInitialState = {
    loading: false,
    newOrder: {},
    list: [],
    details: {},
    error: null,
}

const orderReducer = (state = orderInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                newOrder: payload.newOrder,
                error: null,
            }

        case GET_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload.orders,
                error: null,
            }

        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                details: payload.order,
                error: null,
            }

        case CREATE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                newOrder: {},
                error: payload,
            }

        case GET_ORDER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: [],
                error: payload,
            }

        case GET_ORDER_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                details: {},
                error: payload,
            }

        case GET_ORDER_RESET:
            return {
                ...state,
                loading: false,
                details: {},
                list: [],
                error: null,
            }

        default:
            return state;
    }
}

const payInitialState = {
    loading: false,
    error: null,
    success: false,
}

const payReducer = (state = payInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PAY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PAY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            }

        case PAY_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload,
            }

        case PAY_ORDER_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
            }

        default:
            return state;
    }
}

export { orderReducer, payReducer };