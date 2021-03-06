import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_RE_AUTHENTICATE,
    USER_LOGOUT
} from "../constants/userConstants";

const tokenLocalStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const auth_initial_state = {
    auth_loading: false,
    auth_error: null,
    isAuthenticated: false,
    user: {
        token: tokenLocalStorage
    },
}

export const authReducer = (state = auth_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
            return { ...state, auth_loading: true, isAuthenticated: false, user: {} };

        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return { ...state, auth_loading: false, auth_error: null, isAuthenticated: true, user: payload };

        case USER_RE_AUTHENTICATE:
            return { ...state, auth_loading: false, auth_error: null, isAuthenticated: true }
        
        case USER_REGISTER_ERROR:
        case USER_LOGIN_ERROR:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, auth_error: payload, isAuthenticated: false, user: null };

        case USER_LOGOUT:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, auth_error: payload, isAuthenticated: false, user: {} };

        
        default:
            return state;
    }
}
