import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { formatPrice, getProductDetails } from "../../manager"
import {
    Message, Loader,
    ProductDetails,
    ProductAddToCart
} from "../../components";

function SingleProductDisplay({ match, history }) {
    const productId = match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetails(productId))
        }
    }, [dispatch, productId])

    const productDetails = useSelector(state => state.product);
    const { loading, error, details: product } = productDetails;

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant="warning" center>{error}</Message>;
    }

    const { name, image, price, countInStock } = product;

    return (
        <>
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
                        price={formatPrice(price * 100)}
                        stocks={countInStock}
                        history={history}
                        id={productId}
                    />
                </Col>

            </Row>
        </>
    )
}

export default SingleProductDisplay;
