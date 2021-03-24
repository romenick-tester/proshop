import axios from "axios";
//import { ORDER_RESET } from "../constants/orderConstants";
import {
    USER_REQUEST,
    USER_LOGIN,
    USER_REGISTER,
    USER_ERROR,
    USER_LOGOUT,
    USER_DETAILS,
    UPDATE_ERROR,
} from "../constants/userConstants";

export const loginUser = (form) => async (dispatch) => {
    dispatch({ type: USER_REQUEST })
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post("/api/users/login", body, config);

        dispatch({ type: USER_LOGIN, payload: data });

        localStorage.setItem("token", JSON.stringify(data.token));

    } catch (error) {
        localStorage.removeItem("token");
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_ERROR, payload: { error: msg } });
    }
}

export const registerUser = (form) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post("/api/users/register", body, config);

        dispatch({ type: USER_REGISTER, payload: data });

        localStorage.setItem("token", JSON.stringify(data.token));

    } catch (error) {
        localStorage.removeItem("token");
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_ERROR, payload: { error: msg } });
    }
}

export const getDetails = () => async (dispatch, getState) => {
    try {

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/users/user", config);

        dispatch({ type: USER_DETAILS, payload: data });

    } catch (error) {
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_ERROR, payload: { error: msg } });
    }
}

export const updateDetails = (form) => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.put("/api/users/user", body, config);

        if (data.msg) {
            console.log(data.msg);
            dispatch(getDetails());
        }

    } catch (error) {
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;

        console.log(msg);
        dispatch({ type: UPDATE_ERROR, payload: { error: msg } })
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    //dispatch({ type: ORDER_RESET });
    dispatch({ type: USER_LOGOUT });
};