import store from "./store";
import {
    getProducts,
    getProduct,
} from "./actions/productActions";
import {
    addToCart,
    removeFromCart,
    getShippingAddress,
    getPaymentMethod,
} from "./actions/cartActions";
import {
    registerUser, loginUser, logoutUser, getDetails, updateDetails,
} from "./actions/userActions";


export {
    store,
    getProducts,
    getProduct,
    addToCart,
    removeFromCart,
    getShippingAddress,
    getPaymentMethod,
    registerUser,
    loginUser,
    logoutUser,
    getDetails,
    updateDetails,
};