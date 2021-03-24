import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { formatPrice } from "../../manager";
import { Message } from "../reuseable";

function OrderDetails({ details }) {

    const { user = {}, shippingAddress = {}, paymentMethod, orderItems = [], ...rest } = details ? details : {};

    const { address = "", city = "", postcode = "", country = "" } = shippingAddress;

    const { isPaid, paidAt, isDelivered, deliveredAt } = rest;

    return (
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Table>
                        <thead>
                            <tr>
                                <th>Recipient:</th>
                                <th>Shipping Address:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>{user.name}</strong> <br />
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {address.split(",")[0]}, <br />
                                    {city}, <br />
                                    {postcode}, <br />
                                    {country}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {isDelivered ? (
                        <Message variant="success">Delivered on {deliveredAt}</Message>
                    ) : (
                        <Message variant="danger">Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>payment method</h3>
                    <p>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </p>
                    {isPaid ? (
                        <Message variant="success">Paid on {paidAt}</Message>
                    ) : (
                        <Message variant="danger">Not Paid</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>order items</h3>
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

const Table = styled.table`
    width: 60%;
    margin-bottom: 1rem;
`

export default OrderDetails;
