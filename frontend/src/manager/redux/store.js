import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productListReducer,
    productDetailsReducer,
    cartReducer,
    authReducer,
    allUsersReducer,
} from "./reducers";

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    users: allUsersReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;