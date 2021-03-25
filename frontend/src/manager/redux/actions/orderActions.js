import axios from "axios";
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
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(order);

        const { data } = await axios.post("/api/orders", body, config);

        console.log(data.msg);

        dispatch({ type: CREATE_ORDER_SUCCESS });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: CREATE_ORDER_ERROR,
            payload: msg
        });
    }
}

export const getOrders = () => async (dispatch, getState) => {
    dispatch({ type: GET_ORDER_LIST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/orders", config);

        dispatch({ type: GET_ORDER_LIST_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: GET_ORDER_LIST_ERROR,
            payload: msg
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get(`/api/orders/order/${id}`, config);

        dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: GET_ORDER_DETAILS_ERROR,
            payload: msg
        });
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: PAY_ORDER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(paymentResult);

        const { data } = await axios.put(`/api/orders/order/${orderId}/pay`, body, config);

        console.log(data.msg);

        dispatch({ type: PAY_ORDER_SUCCESS });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: PAY_ORDER_ERROR,
            payload: msg
        });
    }
}