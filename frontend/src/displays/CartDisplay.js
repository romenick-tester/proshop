import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../manager";
import { Cart, Message } from "../components";

function CartDisplay({ match, location, history }) {
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
