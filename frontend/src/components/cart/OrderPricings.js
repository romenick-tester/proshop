import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import { formatPrice, createOrder } from "../../manager";
import { Loader, Message } from "../reuseable";

function OrderPricing({ history }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const placedOrder = useSelector(state => state.placedOrder);
    const { loading, error, order } = placedOrder;

    //calculations
    cart.itemsPrice = cart.cartItems.reduce((acc, { price, qty }) => acc + price * qty, 0);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 10.99 : 49.99);
    cart.taxPrice = (0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    useEffect(() => {
        if (order && order._id) {
            history.push(`/order/${order._id}`);
        }
    }, [order, history])

    function placeOrderHandler() {
        const newOrder = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: Number(cart.itemsPrice.toFixed(2)),
            shippingPrice: Number(cart.shippingPrice.toFixed(2)),
            taxPrice: Number(cart.taxPrice.toFixed(2)),
            totalPrice: Number(cart.totalPrice.toFixed(2)),
        }

        dispatch(createOrder(newOrder));
    }

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>order summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>items</Col>
                        <Col>{formatPrice(cart.itemsPrice)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>shipping</Col>
                        <Col>{formatPrice(cart.shippingPrice)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>tax</Col>
                        <Col>{formatPrice(cart.taxPrice)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>total</Col>
                        <Col>{formatPrice(cart.totalPrice)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0} >
                        place order
                            </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default OrderPricing;
