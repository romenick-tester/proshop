import Axios from "axios";
import {
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_ERROR,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_ERROR,
    DELETE_PRODUCT_BYID_REQUEST,
    DELETE_PRODUCT_BYID_SUCCESS,
    DELETE_PRODUCT_BYID_ERROR,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_LIST_REQUEST });

    try {
        const { data } = await Axios.get("/api/products");

        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: GET_PRODUCT_LIST_ERROR,
            payload: msg,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    try {
        const { data } = await Axios.get(`/api/products/${id}`);

        dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: GET_PRODUCT_DETAILS_ERROR,
            payload: msg,
        });
    }
};

export const deleteProductById = (id) => async (dispatch, getState) => {
    dispatch({ type: DELETE_PRODUCT_BYID_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "auth-token": `${token}`
            }
        }

        const { data } = await Axios.delete(`/api/products/product/${id}`, config);

        dispatch({ type: DELETE_PRODUCT_BYID_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: DELETE_PRODUCT_BYID_ERROR,
            payload: msg,
        });
    }
};

