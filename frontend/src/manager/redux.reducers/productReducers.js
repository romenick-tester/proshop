import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_ERROR, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_ERROR 
} from "../redux.constants/productConstants";

const productListReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;

    switch(type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true, products: [] };
        
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: payload };

        case PRODUCT_LIST_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}

const productDetailsReducer = (state = { product: {} }, action) => {
    const { type, payload } = action;

    switch(type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true, product: {} };
        
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: payload };

        case PRODUCT_DETAILS_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}

export { productListReducer, productDetailsReducer };