import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    formatPrice,
    getProductDetails,
    reviewProduct,
    PRODUCT_RESET
} from "../../manager"
import {
    Message, Loader,
    ProductDetails,
    ProductAddToCart,
    //ProductReviews,
    Meta,
    RatingStar
} from "../../components";

function SingleProductDisplay({ match, history }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productId = match.params.id;

    const dispatch = useDispatch();

    const { authenticated } = useSelector(state => state.auth);

    const productDetails = useSelector(state => state.product);
    const { loading, error, details: product } = productDetails;

    const productById = useSelector(state => state.productById);
    const { loading: reviewing, error: review_error, reviewed } = productById;

    useEffect(() => {
        dispatch({ type: PRODUCT_RESET });
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, reviewed])

    if (loading || (!loading && reviewing)) {
        return <Loader />;
    }

    if (error || (!error && review_error)) {
        return <Message variant="warning" center>{error}</Message>;
    }

    const createReviewHandler = (review) => {
        dispatch(reviewProduct(productId, review))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        createReviewHandler({ rating, comment });
    }

    const { name, image, price, countInStock, review = [], purchaseable } = product;

    return (
        <>
            <Meta title={name} />
            <Link to="/" className="btn btn-light my-2 rounded">Go back</Link>

            <Row>
                <Col md={6}>
                    <Image src={image} alt={name} fluid />
                </Col>

                <Col md={3}>
                    <ProductDetails {...product} />
                </Col>

                <Col md={3}>
                    <ProductAddToCart
                        price={formatPrice(price)}
                        stocks={countInStock}
                        history={history}
                        id={productId}
                        purchaseable={purchaseable}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mt-3">
                    <h3>Reviews</h3>
                    <ListGroup variant="flush">
                        {review.map((r) => {
                            return (
                                <ListGroup.Item key={r._id}>
                                    <strong>{r.name}</strong>
                                    <RatingStar rating={r.rating} />
                                    <p>{r.createdAt.substring(0, 10)}</p>
                                    <p>{r.comment}</p>
                                </ListGroup.Item>
                            )
                        })}

                        <ListGroup.Item>
                            <h3>Write a customer review</h3>
                            {!authenticated ? (
                                <Message variant="info">
                                    Please <Link to={`/login?redirect=product/${productId}`} >sign in</Link> to write a review.
                                </Message>
                            ) : (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)} >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Great</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)} >
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-primary">submit</Button>
                                </Form>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default SingleProductDisplay;
