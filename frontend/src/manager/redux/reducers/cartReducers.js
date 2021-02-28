import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItem: [] }, action) => {
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
            
            return { ...state };
        
        default:
            return state;
    }
}