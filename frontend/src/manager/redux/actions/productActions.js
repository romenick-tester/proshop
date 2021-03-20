import Axios from "axios";
import {
    PRODUCT_REQUEST,
    PRODUCT_LIST,
    PRODUCT_DETAILS,
    PRODUCT_ERROR,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST });

    try {
        const { data } = await Axios.get("/api/products");

        dispatch({ type: PRODUCT_LIST, payload: data });

    } catch (error) {
        dispatch({ 
            type: PRODUCT_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message  
        });
    }
};

export const getProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST });

    try {
        const { data } = await Axios.get(`/api/products/${id}`);

        dispatch({ type: PRODUCT_DETAILS, payload: data });

    } catch (error) {
        dispatch({ 
            type: PRODUCT_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message  
        });
    }
};

