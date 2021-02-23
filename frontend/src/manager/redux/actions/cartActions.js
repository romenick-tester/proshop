import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM 
} from "../constants/cartConstants";

export const addToCart = (items) => (dispatch) => {
    dispatch({ type: CART_ADD_ITEM, payload: items });
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id })
}
