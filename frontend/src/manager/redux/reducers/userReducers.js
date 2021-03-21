import {
    USER_REQUEST,
    USER_LOGIN,
    USER_REGISTER,
    USER_DETAILS,
    USER_ERROR,
    UPDATE_ERROR,
    USER_LOGOUT,
} from "../constants/userConstants";

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const initialState = {
    loading: false,
    authenticated: tokenFromStorage ? true : false,
    token: tokenFromStorage,
    user: {},
    error: null,
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_REGISTER:
        case USER_LOGIN:
            return {
                ...state,
                ...payload,
                loading: false,
                authenticated: true,
                error: null,
            };
        
        case USER_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                authenticated: true,
                error: null,
            }

        case USER_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
                authenticated: false,
                user: {}
            };
        
        case UPDATE_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            }

        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                error: null,
                authenticated: false,
                user: {},
                token: null
            };

        default:
            return state;
    }
}

export default userReducer;
