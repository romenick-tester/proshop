import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR
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
        console.error(error.message);
        dispatch({ type: USER_LOGIN_ERROR });
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
        console.error(error.message);
        dispatch({ type: USER_REGISTER_ERROR });
    }
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
}