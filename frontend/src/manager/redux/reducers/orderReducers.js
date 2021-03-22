import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
} from "../constants/orderConstants";

const initialState = {
    loading: false,
    order: null,
    error: null,
}

const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload,
                error: null,
            }

        case CREATE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                order: null,
                error: payload
            }

        default:
            return state;
    }
}

export default orderReducer;