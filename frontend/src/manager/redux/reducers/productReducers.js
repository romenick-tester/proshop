import {
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_ERROR,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_ERROR,
} from "../constants/productConstants";

const initialState = {
    loading: false,
    details: {},
    list: [],
    error: null,
}

const productReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload.products,
                details: {},
                error: null,
            }

        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [],
                details: payload.product,
                error: null,
            }

        case GET_PRODUCT_LIST_ERROR:
            return {
                ...state,
                loading: false,
                productList: [],
                error: payload,
            }

        case GET_PRODUCT_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                details: {},
                error: payload,
            }

        default:
            return state;
    }
}

export default productReducer;