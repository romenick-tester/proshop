import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./redux.reducers/productReducers";
import { cartReducer } from "./redux.reducers/cartReducers";

const cartItemsLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const reducers = combineReducers({
    productList:        productListReducer,
    productDetails:     productDetailsReducer,
    cart:               cartReducer
});

const initialState = {
    cart: { cartItems: cartItemsLocalStorage }
};

const middlewares = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;