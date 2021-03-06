import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { RatingStar } from "../reuseable";
import { formatPrice } from "../../manager";

function Product({ product }) {
    const {
        _id, name, image, price, rating, numReviews
    } = product;

    return (
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant="top" style={{ height: "200px", objectFit: "fill" }} />
            </Link>
            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as="div">
                        <h5>{name}</h5>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <RatingStar rating={rating} reviews={numReviews} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    {formatPrice(price)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
