import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getOrder, formatPrice } from "../manager";
import { Loader, Message, OrderedDetails, OrderedPrices } from "../components";

function OrderDisplay({ match }) {
    const orderId = match.params.id

    const dispatch = useDispatch();

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
        <>
            {details && (
                <>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ background: "#999" }}>order no: {details._id} </h2>
                        </Col>
                    </Row>
                    <Row>
                        <OrderedDetails {...details} />
                        <OrderedPrices  {...details} />
                    </Row>
                </>
            )}
        </>
    )
}

export default OrderDisplay;
