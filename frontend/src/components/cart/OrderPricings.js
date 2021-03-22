import React from 'react';
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import { formatPrice } from "../../manager";

function OrderPricing({ items }) {

    //calculations
    const itemsPrice = items.reduce((acc, { price, qty }) => acc + price * qty, 0);
    const shippingPrice = (itemsPrice > 100 ? 0 : 100);
    const taxPrice = Number((0.15 * itemsPrice));

    function placeOrderHandler() {
        console.log("order placed!");
    }

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>order summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>items</Col>
                        <Col>{formatPrice(itemsPrice * 100)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>shipping</Col>
                        <Col>{formatPrice(shippingPrice * 100)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>tax</Col>
                        <Col>{formatPrice(taxPrice * 100)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>total</Col>
                        <Col>total price</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        onClick={placeOrderHandler}
                        disabled={items.length === 0} >
                        place order
                            </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default OrderPricing;
