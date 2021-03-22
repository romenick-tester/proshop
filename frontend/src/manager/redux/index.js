import store from "./store";
import {
    getProducts,
    getProduct,
} from "./actions/productActions";
import {
    addToCart,
    removeFromCart,
    shippingAddress,
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
    shippingAddress,
    registerUser,
    loginUser,
    logoutUser,
    getDetails,
    updateDetails,
};