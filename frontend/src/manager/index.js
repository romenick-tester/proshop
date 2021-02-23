import { useGlobalContext, AppProvider } from "./global.context";
import { getProductList, getProductDetails, productListReducer, productDetailsReducer, store } from "./redux";

export { 
    useGlobalContext, AppProvider, 
    getProductList, getProductDetails, productListReducer, productDetailsReducer, store, 
};