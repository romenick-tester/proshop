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
    DELETE_USER_BYID_REQUEST,
    DELETE_USER_BYID_SUCCESS,
    DELETE_USER_BYID_ERROR,
    GET_USER_BYID_REQUEST,
    GET_USER_BYID_SUCCESS,
    GET_USER_BYID_ERROR,
    UPDATE_USER_BYID_REQUEST,
    UPDATE_USER_BYID_SUCCESS,
    UPDATE_USER_BYID_ERROR,
    USER_RESET,
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

export const userListReducer = (state = usersInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case GET_USER_LIST_REQUEST:
            return { ...state, loading: true };

        case GET_USER_LIST_SUCCESS:
            return { ...state, loading: false, list: payload.users, error: null };

        case GET_USER_LIST_ERROR:
            return { ...state, loading: false, list: [], error: payload };

        default:
            return state;
    }
}

const userByIdInitialState = {
    loading: false,
    error: null,
    user: {},
    updated: false,
    deleted: false,
}

export const userByIdReducer = (state = userByIdInitialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case DELETE_USER_BYID_REQUEST:
            return { ...state, loading: true };

        case UPDATE_USER_BYID_REQUEST:
            return { ...state, loading: true };

        case GET_USER_BYID_REQUEST:
            return { ...state, loading: true };


        case DELETE_USER_BYID_SUCCESS:
            return { ...state, loading: false, deleted: true, error: null };

        case UPDATE_USER_BYID_SUCCESS:
            return { ...state, loading: false, updated: true, error: null };

        case GET_USER_BYID_SUCCESS:
            return { ...state, loading: false, user: payload.user, error: null };


        case DELETE_USER_BYID_ERROR:
            return { ...state, loading: false, deleted: false, error: payload };

        case UPDATE_USER_BYID_ERROR:
            return { ...state, loading: false, updated: false, error: payload };

        case GET_USER_BYID_ERROR:
            return { ...state, loading: false, user: {}, error: payload };

        case USER_RESET:
            return { ...state, loading: false, deleted: false, updated: false, error: null };

        default:
            return state;
    }
}