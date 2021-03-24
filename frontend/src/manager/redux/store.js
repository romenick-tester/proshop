import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
    productReducer,
    cartReducer,
    authReducer,
    orderReducer,
    payReducer,
} from "./reducers";

const reducers = combineReducers({
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    payment: payReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;