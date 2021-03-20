import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../manager"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { RatingStar, Alert, Loader } from "../components";

function SingleProductDisplay({ match, history }) {
    const [qty, setQty] = useState(1);

    const productId = match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(getProduct(productId))
        }
    }, [dispatch, productId])

    const productDetails = useSelector(state => state.product);
    const { loading, error, product } = productDetails;

    if(loading) {
        return <Loader/>;
    }
    
    if(error) {
        return <Alert variant="warning">{error}</Alert>;
    }

    function addToCart() {
        history.push(`/cart/${productId}?qty=${qty}`);
    }

    const { name, image, description, price, countInStock, rating, numReviews } = product;

    return (
        <>
            <Link to="/" className="btn btn-light my-2 rounded">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={image} alt={name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush" >
                        <ListGroup.Item>
                            <h3>{name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <RatingStar rating={rating} reviews={numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {price} pound
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: { description }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
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
                                        <span style={{color: `${countInStock === 1 && "orangered"}`}}>
                                            {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                        </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>QTY</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(countInStock)].map((x,i) => {
                                                    return <option key={i+1} value={i+1}>{i+1}</option>
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
                                    disabled={!countInStock}
                                    onClick={addToCart}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SingleProductDisplay;
