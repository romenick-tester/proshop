import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createOrder } from "../manager";
import { CheckoutSteps, OrderDetails, OrderPricings } from "../components";

function PlaceOrderDisplay({ history }) {
    const dispatch = useDispatch();

    function submitOrderHandler(order) {
        dispatch(createOrder(order));
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <OrderDetails />
                </Col>
                <Col md={4}>
                    <OrderPricings history={history} submitOrder={submitOrderHandler} />
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderDisplay;
