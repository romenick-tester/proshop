import React from 'react';
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Message } from "../reuseable";
import OrderItems from "./OrderItems";

function OrderDetails() {
    const cart = useSelector(state => state.cart);
    const { cartItems: items, shippingAddress, paymentMethod: payment } = cart;
    const { address, city, postcode, country } = shippingAddress;

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
                    <OrderItems items={items} />
                )}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default OrderDetails;
