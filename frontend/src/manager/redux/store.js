import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { 
    productListReducer, 
    productDetailsReducer, cartReducer } from "./reducers";

const reducers = combineReducers({
    productList:        productListReducer,
    productDetails:     productDetailsReducer,
    cart:               cartReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;