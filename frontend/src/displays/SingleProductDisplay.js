import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { RatingStar, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../settings"

function SingleProductDisplay({ match }) {
    const productID = match.params.id;
    const dispatch = useDispatch();

    const state = useSelector(state => state.productDetails);
    const { loading, error, product } = state;

    useEffect(() => {
        dispatch(getProductDetails(productID))
    }, [productID, dispatch])

    if(loading) {
        return <Message variant="info">Loading...</Message>;
    }
    
    if(error) {
        return <Message variant="danger">{error}</Message>;
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
                            <RatingStar values={{rating, numReviews}} />
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
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={!countInStock}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SingleProductDisplay;
