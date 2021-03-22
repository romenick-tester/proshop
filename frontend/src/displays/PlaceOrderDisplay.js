import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CheckoutSteps, OrderDetails, OrderPricings } from "../components";

function PlaceOrderDisplay({ history }) {
    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;

    if (!paymentMethod) {
        history.push("/payment");
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <OrderDetails
                        items={cartItems}
                        {...shippingAddress}
                        payment={paymentMethod} />
                </Col>
                <Col md={4}>
                    <OrderPricings items={cartItems} />
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderDisplay;
