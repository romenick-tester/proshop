import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, } from "react-bootstrap";
import { formatPrice } from "../../manager";

function OrderDetails({ shippingAddress = {}, paymentMethod, orderItems = [] }) {
    return (
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>shipping address</h2>
                    <p>
                        <strong>Address: </strong> <br />
                        {shippingAddress.address},
                        {shippingAddress.city},
                        {shippingAddress.postcode},
                        {shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>payment method</h2>
                    <p>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>order items</h2>
                    <ListGroup variant="flush">
                        {orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {formatPrice(item.price)} = {formatPrice(item.qty * item.price)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

export default OrderDetails;
