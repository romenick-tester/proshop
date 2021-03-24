import axios from "axios";
import {
    ORDER_REQUEST,
    CREATE_ORDER,
    ORDER_ERROR,
    GET_ORDER,
    GET_ORDERS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_ERROR,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_REQUEST });

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

        dispatch({ type: CREATE_ORDER, payload: { createdOrder: data } });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_ERROR,
            payload: { error: msg }
        });
    }
}

export const getOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/orders", config);

        dispatch({ type: GET_ORDERS, payload: { list: data.orders } });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_ERROR,
            payload: { error: msg }
        });
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    dispatch({ type: ORDER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get(`/api/orders/order/${id}`, config);

        dispatch({ type: GET_ORDER, payload: { details: data.order } });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_ERROR,
            payload: { error: msg }
        });
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });

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

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data.paymentResult });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_PAY_ERROR,
            payload: msg
        });
    }
}