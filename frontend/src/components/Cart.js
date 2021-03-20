import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";
import Message from "./Message";

function Cart() {
    const { cartItems: items } = useSelector(state => state.cart);

    return (
        <>
            <h1>Shopping Cart</h1>
            {items.length === 0 ? <Message>Your cart is empty <Link to="/">go back</Link></Message> : (
                <ListGroup variant="flush">
                    {items && items.map((item) => (
                        <CartItem key={item.product} item={item} />
                    ))}
                </ListGroup>
            )}
        </>
    )
}

export default Cart;
