import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { Loader } from "../reuseable";
import { formatPrice } from "../../manager";

function OrderPrices({ sdkReady, details, successPaymentHandler }) {

    return (
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>order summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>items</Col>
                            <Col>{formatPrice(details.itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>shipping</Col>
                            <Col>{formatPrice(details.shippingPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>tax</Col>
                            <Col>{formatPrice(details.taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>total</Col>
                            <Col>{formatPrice(details.totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!details.isPaid && (
                        <ListGroup.Item>
                            {!sdkReady ? <Loader /> : (
                                <PayPalButton amount={details.totalPrice} onSuccess={successPaymentHandler} />
                            )}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    )
}

export default OrderPrices
