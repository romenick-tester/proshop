import React, { useState } from 'react'
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";

function ProductAddToCart({ price, stocks, history, id }) {
    const [qty, setQty] = useState(1);

    function addToCart() {
        history.push(`/cart/${id}?qty=${qty}`);
    }

    return (
        <Card>
            <ListGroup variant="flush">

                <ListGroup.Item>
                    <Row>
                        <Col>
                            Price:
                        </Col>
                        <Col>
                            <strong>{price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                            Status:
                        </Col>
                        <Col>
                            <span style={{ color: `${stocks === 1 && "orangered"}` }}>
                                {stocks > 0 ? "In Stock" : "Out Of Stock"}
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>

                {stocks > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>QTY</Col>
                            <Col>
                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(stocks)].map((x, i) => {
                                        return <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        disabled={!stocks}
                        onClick={addToCart}>Add To Cart</Button>
                </ListGroup.Item>

            </ListGroup>
        </Card>
    )
}

export default ProductAddToCart;
