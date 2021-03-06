import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { addToCart } from "../manager";
import { Cart } from "../components";

function CartDisplay({ match, location }) {
    const dispatch = useDispatch();
    const productID = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    useEffect(() => {
        if(productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [productID, qty, dispatch])

    return (
        <Row>
            <Col md={8}>
                <Cart />
            </Col>
        </Row>
    )
}

export default CartDisplay;
