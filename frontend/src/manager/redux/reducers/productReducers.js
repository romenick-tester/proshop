import {
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_ERROR,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_ERROR,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    DELETE_PRODUCT_BYID_REQUEST,
    DELETE_PRODUCT_BYID_SUCCESS,
    DELETE_PRODUCT_BYID_ERROR,
    PRODUCT_RESET,
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

const productByIdReducer = (state = { deleted: false }, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_PRODUCT_BYID_REQUEST:
            return { ...state, loading: true };

        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true };

        case DELETE_PRODUCT_BYID_SUCCESS:
            return { ...state, loading: false, deleted: payload, error: null };

        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, created: payload, error: null };

        case DELETE_PRODUCT_BYID_ERROR:
            return { ...state, loading: false, deleted: false, error: payload };

        case CREATE_PRODUCT_ERROR:
            return { ...state, loading: false, created: false, error: payload };

        case PRODUCT_RESET:
            return { ...state, loading: false, deleted: false, created: false, error: null };

        default:
            return state;
    }
}

export { productReducer, productByIdReducer };