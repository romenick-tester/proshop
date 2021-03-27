import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productReducer,
    productByIdReducer,
    cartReducer,
    userReducer,
    orderReducer,
    payReducer,
    userListReducer,
    userByIdReducer,
    orderAdminReducer
} from "./reducers";

const reducers = combineReducers({
    product: productReducer,
    auth: userReducer,
    cart: cartReducer,
    order: orderReducer,
    orderPay: payReducer,
    userList: userListReducer,
    userById: userByIdReducer,
    productById: productByIdReducer,
    orderAdmin: orderAdminReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;