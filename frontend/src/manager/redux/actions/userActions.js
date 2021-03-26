import axios from "axios";
import { CART_RESET } from "../constants/cartConstants";
import { ALL_ORDER_RESET } from "../constants/orderConstants";
import {
    USER_REQUEST,
    USER_LOGIN,
    USER_REGISTER,
    USER_ERROR,
    USER_LOGOUT,
    USER_DETAILS,
    UPDATE_ERROR,
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    GET_USER_BYID_REQUEST,
    GET_USER_BYID_SUCCESS,
    GET_USER_BYID_ERROR,
    UPDATE_USER_BYID_REQUEST,
    UPDATE_USER_BYID_SUCCESS,
    UPDATE_USER_BYID_ERROR,
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

export const getUserDetails = () => async (dispatch, getState) => {
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
        const { auth: { token, user } } = getState();

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
            dispatch(getUserDetails(user._id));
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

export const getUsers = () => async (dispatch, getState) => {
    dispatch({ type: GET_USER_LIST_REQUEST })

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/users", config);

        dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: GET_USER_LIST_ERROR, payload: msg })
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    dispatch({ type: DELETE_USER_REQUEST })

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/users/user/${id}`, config);

        console.log(data.msg);

        dispatch({ type: DELETE_USER_SUCCESS });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: DELETE_USER_ERROR, payload: msg })
    }
};

export const getUserById = (id) => async (dispatch, getState) => {
    dispatch({ type: GET_USER_BYID_REQUEST })

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get(`/api/users/user/${id}`, config);

        dispatch({ type: GET_USER_BYID_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: GET_USER_BYID_ERROR, payload: msg })
    }
};

export const updateUserById = (id, form) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_BYID_REQUEST })

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.put(`/api/users/user/${id}`, body, config);

        dispatch({ type: UPDATE_USER_BYID_SUCCESS, payload: data });

    } catch (error) {
        const msg = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({ type: UPDATE_USER_BYID_ERROR, payload: msg })
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    dispatch({ type: ALL_ORDER_RESET });
    dispatch({ type: CART_RESET });
    dispatch({ type: USER_LOGOUT });
};