import React from 'react';
import { Row, Col } from "react-bootstrap";
import { CheckoutSteps, OrderDetails, OrderPricings } from "../components";

function PlaceOrderDisplay({ history }) {

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <OrderDetails />
                </Col>
                <Col md={4}>
                    <OrderPricings history={history} />
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderDisplay;
