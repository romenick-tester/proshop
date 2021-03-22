import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get(`/api/products/${id}`);

        const { _id: product, name, image, price, countInStock } = data.product;

        const format = {
            product,
            name,
            image,
            price,
            countInStock,
            qty,
        }

        dispatch({ type: CART_ADD_ITEM, payload: format });

        const { cart: { cartItems } } = getState();

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        console.error(error.message);
    }
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({ type: CART_REMOVE_ITEM, payload: id })

    const { cart: { cartItems } } = getState();

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const getShippingAddress = (data) => (dispatch) => {

    dispatch({ type: CART_SHIPPING_ADDRESS, payload: data });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const getPaymentMethod = (data) => (dispatch) => {

    dispatch({ type: CART_PAYMENT_METHOD, payload: data });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
}
