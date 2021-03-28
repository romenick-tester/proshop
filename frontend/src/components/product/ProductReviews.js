import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { ListGroup, Form, Button } from "react-bootstrap";
import { RatingStar, Message } from "../reuseable";

function ProductReviews({ reviews, createReviewHandler, productId }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { authenticated } = useSelector(state => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        createReviewHandler({ rating, comment });
    }

    return (
        <ListGroup variant="flush">
            {reviews.map((review) => {
                const { _id: id, rating, comment, name, createdAt } = review;

                return (
                    <ListGroup.Item key={id}>
                        <strong>{name}</strong>
                        <RatingStar rating={rating} />
                        <p>{createdAt.substring(0, 10)}</p>
                        <p>{comment}</p>
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
                                autoFocus
                                onChange={(e) => setComment(e.target.value)} >
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary">submit</Button>
                    </Form>
                )}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default ProductReviews;
