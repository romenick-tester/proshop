import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../manager";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";

function CartDisplay({ match, location, history }) {
    const productID = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if(productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [productID, qty, dispatch])

    return (
        <div>
            {cartItems && cartItems.map((item) => {
                return <h6>{item.name}</h6>
            })}
        </div>
    )
}

export default CartDisplay;
