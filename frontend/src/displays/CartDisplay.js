import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { addToCart } from "../manager";
import { Cart } from "../components";

function CartDisplay({ match, location }) {

    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [productId, qty, dispatch])

    return (
        <Row>
            <Col md={8}>
                <Cart />
            </Col>
        </Row>
    )
}

export default CartDisplay;
