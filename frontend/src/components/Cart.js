import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";
import Message from "./Message";

function Cart() {
    const { cartItems } = useSelector(state => state.cart);

    const items = cartItems ? cartItems : [];
    return (
        <>
            <h1>Shopping Cart</h1>
            {items.length === 0 ? <Message>Your cart is empty <Link to="/">go back</Link></Message> : (
                <ListGroup variant="flush">
                    {items.map((item) => (
                        <CartItem key={item.product} item={item} />
                    ))}
                </ListGroup>
            )}
        </>
    )
}

export default Cart;
