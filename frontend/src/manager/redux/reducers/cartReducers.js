import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
} from "../constants/cartConstants";

const cartItemsLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const shippingAddressLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
const paymentMethodLocalStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "";

const initialState = {
    cartItems: cartItemsLocalStorage,
    shippingAddress: shippingAddressLocalStorage,
    paymentMethod: paymentMethodLocalStorage,
}

export const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== payload)
            };

        case CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload,
            }

        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload,
            }

        default:
            return state;
    }
}