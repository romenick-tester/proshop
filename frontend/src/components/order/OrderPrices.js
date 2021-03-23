import React from 'react';
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { formatPrice } from "../../manager";

function OrderPrices({ shippingPrice, itemsPrice, taxPrice, totalPrice }) {
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
                            <Col>{formatPrice(itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>shipping</Col>
                            <Col>{formatPrice(shippingPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>tax</Col>
                            <Col>{formatPrice(taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>total</Col>
                            <Col>{formatPrice(totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    )
}

export default OrderPrices
