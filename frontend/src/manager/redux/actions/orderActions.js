import axios from "axios";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
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

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}