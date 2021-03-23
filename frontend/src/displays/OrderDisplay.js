import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import { getOrder } from "../manager";
import { Loader, Message } from "../components";

function OrderDisplay({ match }) {
    const orderId = match.params.id

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const order = useSelector(state => state.order);
    const { loading, error, details } = order;

    useEffect(() => {
        if (orderId) {
            dispatch(getOrder(orderId));
        }
    }, [dispatch, orderId]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    return (
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    {details && (
                        <ListGroup.Item>
                            <h4>details ready</h4>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Col>
            <Col md={4}>

            </Col>
        </Row>
    )
}

export default OrderDisplay;
