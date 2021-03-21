import React from 'react';
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import SingleItem from "./CartItem";
import { Message } from "../reuseable";

function CartItems({ items }) {

    return (
        <>
            <h1>Shopping Cart</h1>
            {items.length === 0 ? <Message>Your cart is empty <Link to="/">go back</Link></Message> : (
                <ListGroup variant="flush">
                    {items && items.map((item) => (
                        <SingleItem key={item.product} item={item} />
                    ))}
                </ListGroup>
            )}
        </>
    )
}

export default CartItems;
