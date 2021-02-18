import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { RatingStar } from "./subcomponents";

function Product({ product }) {
    const { 
        id, name, image, price, rating, numReviews
    } = product;

    return (
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${id}`}>
                <Card.Img src={image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${id}`}>
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <RatingStar values={{rating, numReviews}} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    £ {price}
                </Card.Text>    
            </Card.Body>
        </Card>
    )
}

export default Product;
