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
    ALL_ORDER_RESET,
    GET_ORDER_ALL_REQUEST,
    GET_ORDER_ALL_SUCCESS,
    GET_ORDER_ALL_ERROR,
    DELIVER_ORDER_REQUEST,
    DELIVER_ORDER_SUCCESS,
    DELIVER_ORDER_ERROR,
    ORDER_RESET,
} from "../constants/orderConstants";

const orderInitialState = {
    loading: false,
    error: null,
    list: [],
    details: {},
}

const orderReducer = (state = orderInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case GET_ORDER_LIST_REQUEST:
            return { ...state, loading: true };

        case GET_ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };

        case GET_ORDER_LIST_SUCCESS:
            return { ...state, loading: false, list: payload.orders, details: {}, error: null };

        case GET_ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, list: [], details: payload.order, error: null };

        case GET_ORDER_LIST_ERROR:
            return { ...state, loading: false, list: [], error: payload };

        case GET_ORDER_DETAILS_ERROR:
            return { ...state, loading: false, details: {}, error: payload };

        case ALL_ORDER_RESET:
            return { ...state, loading: false, details: {}, list: [], error: null };

        default:
            return state;
    }
}

const orderAdminInitialState = {
    loading: false,
    error: null,
    list: [],
    newOrder: {},
    created: false,
    paid: false,
    delivered: false,
    page: 1,
    pages: 1,
}

const orderAdminReducer = (state = orderAdminInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true };

        case GET_ORDER_ALL_REQUEST:
            return { ...state, loading: true };

        case PAY_ORDER_REQUEST:
            return { ...state, loading: true };

        case DELIVER_ORDER_REQUEST:
            return { ...state, loading: true };


        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, created: true, newOrder: payload.newOrder, error: null };

        case GET_ORDER_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload.orders,
                page: payload.page,
                pages: payload.pages,
                error: null
            };

        case PAY_ORDER_SUCCESS:
            return { ...state, loading: false, paid: true, error: null };

        case DELIVER_ORDER_SUCCESS:
            return { ...state, loading: false, delivered: true, error: null };


        case CREATE_ORDER_ERROR:
            return { ...state, loading: false, created: false, newOrder: {}, error: payload };

        case GET_ORDER_ALL_ERROR:
            return { ...state, loading: false, list: {}, error: payload };

        case PAY_ORDER_ERROR:
            return { ...state, loading: false, paid: false, error: payload };

        case DELIVER_ORDER_ERROR:
            return { ...state, loading: false, delivered: false, error: payload };


        case ORDER_RESET:
            return { ...state, loading: false, paid: false, delivered: false, created: false, newOrder: {}, error: null };

        default:
            return state;
    }
}

export { orderReducer, orderAdminReducer };