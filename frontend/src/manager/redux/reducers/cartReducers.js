import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const cartItemsLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const cart_initial_state = {
    cartItems: cartItemsLocalStorage
}

export const cartReducer = (state = cart_initial_state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ADD_ITEM:
            const item = payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            if(existItem) {
                return {
                    ...state, 
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x ) 
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
            
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== payload)
            };
        
        default:
            return state;
    }
}