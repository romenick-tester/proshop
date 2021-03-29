import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getProducts } from "../../manager";
import { Message, Product, Loader, Paginate, ProductCarousel, Meta } from "../../components";

function HomeDisplay({ match }) {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const product = useSelector(state => state.product);
    const { loading, error, list: products, pages, page } = product;

    useEffect(() => {
        dispatch(getProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger" center>{error}</Message>
    }

    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-dark">Go Back</Link>}
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
            <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
            />
        </>
    )
}

export default HomeDisplay;
