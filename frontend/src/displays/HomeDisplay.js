import React from "react";
import { useProductsContext } from "../settings";
import { Row, Col } from "react-bootstrap";
import { Message, Product } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { TEST, counterAction } from "../settings"

function HomeDisplay() {
    const { loading, products } = useProductsContext();

    const dispatch = useDispatch();

    const counterState = useSelector(state => state.counter);

    if(loading) {
        return <Message variant="info">Loading...</Message>
    }

    return (
        <>
        <h1>Latest Products {counterState}</h1>
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
