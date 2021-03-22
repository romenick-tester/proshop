import React from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { Message } from "../reuseable";

function OrderDetails({ items, payment, address, city, postcode, country }) {

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>shipping address</h2>
                <p>
                    <strong>Address: </strong> <br />
                    {address}, {city}, {postcode}, {country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>payment method</h2>
                <p>
                    <strong>Method: </strong>
                    {payment}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>order items</h2>
                {items.length === 0 ? (
                    <Message> Your cart is empty! </Message>
                ) : (
                    <ListGroup variant="flush">
                        {items.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x £{item.price} = £{item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default OrderDetails;
