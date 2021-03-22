import React from 'react';
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import { formatPrice } from "../../manager";

function OrderPricing({ items }) {

    //calculations
    const itemsPrice = items.reduce((acc, { price, qty }) => acc + price * qty, 0);
    const shippingPrice = (itemsPrice > 100 ? 0 : 100);
    const taxPrice = Number((0.15 * itemsPrice));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    function placeOrderHandler() {
        const newFormats = {
            newItemPrice: formatPrice(itemsPrice),
            newShippingPrice: formatPrice(shippingPrice),
            newTaxPrice: formatPrice(taxPrice),
            newTtotalPrice: formatPrice(totalPrice)
        }

        console.log(newFormats);
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
