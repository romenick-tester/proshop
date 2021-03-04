import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productListReducer,
    productDetailsReducer,
    cartReducer, authReducer,
} from "./reducers";

const cartItemsLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const tokenLocalStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
});

const initialState = {
    cart: { cartItems: cartItemsLocalStorage },
    auth: {
        auth_loading: false,
        isAuthenticated: tokenLocalStorage ? true : false,
        user: { token: tokenLocalStorage ? tokenLocalStorage : null }
    }
};

const middlewares = [thunk];

const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;