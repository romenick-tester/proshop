import {
    ORDER_REQUEST,
    CREATE_ORDER,
    GET_ORDER,
    GET_ORDERS,
    ORDER_ERROR,
} from "../constants/orderConstants";

const initialState = {
    loading: false,
    createdOrder: {},
    single: {},
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

        default:
            return state;
    }
}

export default orderReducer;