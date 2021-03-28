import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
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
    ProductReviews,
} from "../../components";

function SingleProductDisplay({ match, history }) {
    const productId = match.params.id;

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.product);
    const { loading, error, details: product } = productDetails;

    const productById = useSelector(state => state.productById);
    const { loading: reviewing, error: review_error, reviewed } = productById;

    useEffect(() => {
        dispatch({ type: PRODUCT_RESET });
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, reviewed])

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant="warning" center>{error}</Message>;
    }

    const createReviewHandler = (review) => {
        dispatch(reviewProduct(productId, review))
    }

    const { name, image, price, countInStock, review = [] } = product;

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
                        price={formatPrice(price)}
                        stocks={countInStock}
                        history={history}
                        id={productId}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mt-3">
                    <h3>Reviews</h3>
                    {reviewing && <Loader />}
                    {review_error && <Message variant="danger">{review_error}</Message>}
                    {review.length === 0 && <Message variant="info"> No Reviews </Message>}
                    <ProductReviews
                        reviews={review}
                        productId={productId}
                        createReviewHandler={createReviewHandler}
                    />
                </Col>
            </Row>
        </>
    )
}

export default SingleProductDisplay;
