import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productReducer,
    productByIdReducer,
    cartReducer,
    userReducer,
    orderReducer,
    userListReducer,
    userByIdReducer,
    orderAdminReducer
} from "./reducers";

const reducers = combineReducers({
    product: productReducer,
    auth: userReducer,
    cart: cartReducer,
    order: orderReducer,

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