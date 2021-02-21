import React from "react";
import { useProductsContext } from "../settings";
import { Row, Col } from "react-bootstrap";
import { Message, Product, Loader } from "../components";

function HomeDisplay() {
    const { loading, products, error } = useProductsContext();

    if(loading) {
        return <Loader />
    }

    if(error) {
        return <Message variant="danger">{error}</Message>
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
