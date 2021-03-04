import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_LOGOUT
} from "../constants/userConstants";

const auth_initial_state = {
    auth_loading: false,
    auth_error: false,
    isAuthenticated: null,
    user: null,
}

export const authReducer = (state = auth_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
            return { ...state, auth_loading: true, isAuthenticated: false, user: {} };

        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return { ...state, auth_loading: false, isAuthenticated: true, user: payload };

        case USER_REGISTER_ERROR:
        case USER_LOGIN_ERROR:
        case USER_LOGOUT:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, auth_error: true, isAuthenticated: false, user: null };

        default:
            return state;
    }
}
