import React from 'react'
import { ListGroup } from "react-bootstrap";
import { RatingStar } from "../reuseable"
import { formatPrice } from "../../manager";

function ProductDetails({ name, rating, numReviews, price, description }) {
    return (
        <ListGroup variant="flush" >
            <ListGroup.Item>
                <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <RatingStar rating={rating} reviews={numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
                Price: {formatPrice(price * 100)}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: {description}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default ProductDetails;
