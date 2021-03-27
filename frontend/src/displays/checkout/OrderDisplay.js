import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Table, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails, payOrder, formatPrice, deliverOrder } from "../../manager";
import { Message, Loader } from "../../components";
import { ORDER_RESET } from '../../manager';
import axios from "axios";

function OrderDisplay({ match }) {
    const [sdkReady, setSdkReady] = useState(false);

    const orderId = match.params.id;
    const dispatch = useDispatch();

    const { user: info } = useSelector(state => state.auth);

    const orderAdmin = useSelector(state => state.orderAdmin);
    const { loading, error, created, paid, delivered } = orderAdmin;

    const { details } = useSelector(state => state.order);

    const addPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
    }

    useEffect(() => {
        if (!details || orderId !== details._id || (paid || delivered || created)) {
            dispatch({ type: ORDER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!details.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, details, paid, delivered, created]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId));
    }

    const {
        user = {}, shippingAddress = {}, orderItems = [],
        paymentMethod, isDelivered, deliveredAt, isPaid, paidAt
    } = details;

    const { address = "" } = shippingAddress;

    return (
        <>
            <h2>order no: {orderId} </h2>
            <Row>
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
                                            {shippingAddress.city}, <br />
                                            {shippingAddress.postcode}, <br />
                                            {shippingAddress.country}
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
                                    {loading && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={details.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}

                            {details.paymentResult && (
                                <ListGroup.Item>
                                    <h4>RECEIPT:</h4>
                                    <p>
                                        <strong>ID:</strong> <br />
                                        {details.paymentResult.id} <br />
                                        <strong>EMAIL:</strong> <br />
                                        {details.paymentResult.email_address} <br />
                                        <strong>PAID AT:</strong> <br />
                                        {details.paymentResult.update_time}
                                    </p>
                                </ListGroup.Item>
                            )}

                            {info.isAdmin && details.isPaid && !details.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={deliverHandler}>mark as delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderDisplay;
