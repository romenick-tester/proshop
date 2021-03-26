import axios from "axios";
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

export const getProducts = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_LIST_REQUEST });

    try {
        const { data } = await axios.get("/api/products");

        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data });

        dispatch({ type: PRODUCT_RESET });

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
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: GET_PRODUCT_DETAILS_ERROR,
            payload: msg,
        });
    }
};

export const createProduct = (form) => async (dispatch, getState) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "auth-token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post(`/api/products`, body, config);

        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.created });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CREATE_PRODUCT_ERROR,
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

        const { data } = await axios.delete(`/api/products/product/${id}`, config);

        dispatch({ type: DELETE_PRODUCT_BYID_SUCCESS, payload: data.deleted });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: DELETE_PRODUCT_BYID_ERROR,
            payload: msg,
        });
    }
};