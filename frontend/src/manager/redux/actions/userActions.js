import axios from "axios";
import {
    USER_GET_ALL_REQUEST,
    USER_GET_ALL_SUCCESS,
    USER_GET_ALL_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_RE_AUTHENTICATE,
} from "../constants/userConstants";

export const loginUser = (form) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST })
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post("/api/users/login", body, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_LOGIN_ERROR, payload: msg });
    }
}

export const registerUser = (form) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post("/api/users/register", body, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_REGISTER_ERROR, payload: msg });
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: USER_GET_ALL_REQUEST });

    try {
        const { data } = await axios.get("/api/users/all");

        dispatch({ type: USER_GET_ALL_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_GET_ALL_ERROR });
    }
}

export const reAuthenticate = () => (dispatch) => {
    dispatch({ type: USER_RE_AUTHENTICATE });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
}