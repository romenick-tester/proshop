import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { addToCart } from "../manager";
import { CartItems, CartInfo } from "../components";

function CartDisplay({ match, location, history }) {

    const productId = match.params.id;
    
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    
    const dispatch = useDispatch();
    
    const { cartItems: items } = useSelector(state => state.cart);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [productId, qty, dispatch])

    function checkout() {
        history.push("/login?redirect=shipping");
    }

    return (
        <Row>
            <Col md={8}>
                <CartItems items={items} />
            </Col>
            <Col md={4}>
                <CartInfo items={items} checkout={checkout} />
            </Col>
        </Row>
    )
}

export default CartDisplay;
