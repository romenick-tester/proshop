import React from "react";
import { useGlobalContext } from "../manager/context/globalContext";
import { Row, Col } from "react-bootstrap";
import { Product } from "../components";

function HomeDisplay() {
    const { products } = useGlobalContext();
    
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
