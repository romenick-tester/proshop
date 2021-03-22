import React from 'react';
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, formatPrice } from "../../manager";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";

function CartItem({ item }) {
    const dispatch = useDispatch();

    function removeFromCartHandler(id) {
        dispatch(removeFromCart(id));
    }

    const { product, name, image, price, countInStock, qty } = item;

    return (
        <ListGroup.Item>
            <Row className="justify-text-center">
                <Col md={2}>
                    <Image src={image} alt={name} fluid rounded />
                </Col>
                <Col md={3}>
                    <Link to={`/product/${product}`}> {name} </Link>
                </Col>
                <Col md={2}>
                    {formatPrice(price)} (1)
                </Col>
                <Col md={2}>
                    <Form.Control as="select" value={qty} onChange={(e) => dispatch(addToCart(product, Number(e.target.value)))} >
                        {[...Array(countInStock)].map((x, i) => {
                            return <option key={i + 1} value={i + 1}>{i + 1}</option>
                        })}
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Button type="button" variant="danger" onClick={() => removeFromCartHandler(product)}>
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default CartItem;
