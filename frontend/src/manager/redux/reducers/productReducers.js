import { 
    PRODUCT_REQUEST,
    PRODUCT_LIST,
    PRODUCT_DETAILS,
    PRODUCT_ERROR,
} from "../constants/productConstants";

const initialState = {
    loading: false,
    product: {},
    products: [],
    error: null,
}

const productReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case PRODUCT_LIST:
        case PRODUCT_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
            }
        
        case PRODUCT_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            }
        
        default:
            return state;
    }
}

export default productReducer;