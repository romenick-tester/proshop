import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getProducts } from "../../manager";
import { Message, Product, Loader } from "../../components";

function HomeDisplay({ match }) {
    const keyword = match.params.keyword;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [dispatch, keyword])

    const product = useSelector(state => state.product);
    const { loading, error, list: products } = product;

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger" center>{error}</Message>
    }

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default HomeDisplay;
