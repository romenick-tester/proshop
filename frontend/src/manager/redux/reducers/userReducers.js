import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_RE_AUTHENTICATE,
    USER_LOGOUT,
    ALL_MEMBERS_REQUEST,
    ALL_MEMBERS_SUCCESS,
    ALL_MEMBERS_ERROR,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_ERROR
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
            return { ...state, auth_loading: false, auth_error: payload, isAuthenticated: false, user: {} };

        case USER_LOGOUT:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, auth_error: payload, isAuthenticated: false, user: {} };

        default:
            return state;
    }
}

const user_details_initial_state = {
    user_details_loading: false,
    user_details_error: null,
    user_details: {}
}

export const userDetailsReducer = (state = user_details_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {

        case USER_UPDATE_DETAILS_REQUEST:
        case USER_DETAILS_REQUEST:
            return {
                user_details_loading: true,
                user_details_error: null,
                user_details: {}
            }

        case USER_UPDATE_DETAILS_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return {
                user_details_loading: false,
                user_details_error: null,
                user_details: payload
            }

        case USER_UPDATE_DETAILS_ERROR:
        case USER_DETAILS_ERROR:
            return {
                user_details_loading: false,
                user_details_error: payload,
                user_details: {}
            }

        default:
            return state;
    }
}

const members_initial_state = {
    members_loading: false,
    members_error: false,
    members: []
}

export const allMembersReducer = (state = members_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ALL_MEMBERS_REQUEST:
            return { ...state, members_loading: true, members_error: false, members: [] }

        case ALL_MEMBERS_SUCCESS:
            return { ...state, members_loading: false, members_error: false, members: payload }

        case ALL_MEMBERS_ERROR:
            return { ...state, members_loading: true, members_error: true, members: [] }

        default:
            return state
    }
}