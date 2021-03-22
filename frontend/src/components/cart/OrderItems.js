import React from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { formatPrice } from "../../manager";

function OrderItems({ items }) {

    return (
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
                            {item.qty} x {formatPrice(item.price)} = {formatPrice(item.qty * item.price)}
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default OrderItems;
