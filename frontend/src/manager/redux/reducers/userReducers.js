import {
    USER_REQUEST,
    USER_LOGIN,
    USER_REGISTER,
    USER_DETAILS,
    USER_ERROR,
    UPDATE_ERROR,
    USER_LOGOUT,
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
} from "../constants/userConstants";

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const initialState = {
    loading: false,
    authenticated: tokenFromStorage ? true : false,
    token: tokenFromStorage,
    user: {},
    error: null,
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REQUEST:
            return { ...state, loading: true };

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
            return { ...state, ...payload, loading: false };

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

const usersInitialState = {
    loading: false,
    list: [],
    error: null,
}

export const usersReducer = (state = usersInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case GET_USER_LIST_REQUEST:
            return { ...state, loading: true }

        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload.users,
                error: null,
            }

        case GET_USER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: [],
                error: payload
            }

        default:
            return state;
    }
}

export const userDeleteReducer = (state = { deleted: false }, action) => {
    const { type, payload } = action;

    switch (type) {

        case DELETE_USER_REQUEST:
            return { ...state, loading: true };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleted: true,
                error: null,
            }

        case DELETE_USER_ERROR:
            return {
                ...state,
                loading: false,
                deleted: false,
                error: payload
            }

        default:
            return state;
    }
}