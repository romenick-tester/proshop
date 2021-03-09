import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productListReducer,
    productDetailsReducer,
    cartReducer,
    authReducer,
    allMembersReducer,
    userDetailsReducer,
} from "./reducers";

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    members: allMembersReducer,
    user: userDetailsReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;