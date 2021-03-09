import axios from "axios";
import {
    ALL_MEMBERS_REQUEST,
    ALL_MEMBERS_SUCCESS,
    ALL_MEMBERS_ERROR,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR,
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

export const getUserDetails = (token) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST })
    try {

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/users", config);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const msg = error.response
            && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_DETAILS_ERROR, payload: msg });
    }
}

export const getAllMembers = () => async (dispatch) => {
    dispatch({ type: ALL_MEMBERS_REQUEST });

    try {
        const { data } = await axios.get("/api/users/all");

        dispatch({ type: ALL_MEMBERS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: ALL_MEMBERS_ERROR });
    }
}

export const reAuthenticate = () => (dispatch) => {
    dispatch({ type: USER_RE_AUTHENTICATE });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
}