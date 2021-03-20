import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../manager";
import { Row, Col } from "react-bootstrap";
import { Alert, Product, Loader } from "../components";

function HomeDisplay() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const productList = useSelector(state => state.product);
    const { loading, error, products } = productList;
    
    if(loading) {
        return <Loader />
    }

    if(error) {
        return <Alert variant="danger">{error}</Alert>
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
