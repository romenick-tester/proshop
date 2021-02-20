import React from "react";
import { useProductsContext } from "../settings";
import { Row, Col } from "react-bootstrap";
import { Message, Product } from "../components";

function HomeDisplay() {
    const { loading, products } = useProductsContext();

    if(loading) {
        return <Message variant="info">Loading...</Message>
    } else if(!products){
        return <Message variant="danger">Error...</Message>
    }

    return (
        <>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product) => {
                return (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                )
            })}
        </Row>
        </>
    )
}

export default HomeDisplay;
