import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productReducer,
    cartReducer,
    userReducer,
    orderReducer,
    payReducer,
    usersReducer,
    userDeleteReducer,
    userByIdReducer
} from "./reducers";

const reducers = combineReducers({
    product: productReducer,
    auth: userReducer,
    cart: cartReducer,
    order: orderReducer,
    orderPay: payReducer,
    usersList: usersReducer,
    userDelete: userDeleteReducer,
    userById: userByIdReducer
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;