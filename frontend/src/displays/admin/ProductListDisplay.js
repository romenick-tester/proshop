import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { Loader, Message, Paginate } from "../../components";
import { getProducts, deleteProductById, formatPrice, createProduct } from "../../manager";

function ProductListDisplay({ match }) {
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const { loading: product_loading, error: product_error, list: products, pages, page } = useSelector(state => state.product);

    const productById = useSelector(state => state.productById);
    const { loading, error, deleted, created } = productById;

    useEffect(() => {
        dispatch(getProducts("", pageNumber));
    }, [dispatch, deleted, created, pageNumber]);

    if (product_loading || (!product_loading && loading)) {
        return <Loader />
    }

    if (product_error || (!product_error && error)) {
        return <Message variant="danger">{error}</Message>
    }

    const deleteProductHandler = (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            dispatch(deleteProductById(productId));
        }
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="btn-sm my-3" onClick={() => dispatch(createProduct())}>
                        CREATE NEW <FaPlus />
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive className="table-sm">
                <THEAD>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </THEAD>
                <TBODY>
                    {products.map((product) => {
                        const { _id, name, price, category, brand } = product;

                        return (
                            <tr key={_id}>
                                <td>{_id}</td>
                                <td>{name}</td>
                                <td>{formatPrice(price)}</td>
                                <td>{category}</td>
                                <td>{brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${_id}/edit`} >
                                        <Button variant="light" className="btn-sm">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteProductHandler(_id)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </TBODY>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
        </>
    )
}

const THEAD = styled.thead`
    text-align: center;
    background: #333;
    color: white;
`

const TBODY = styled.tbody`
    text-align: center;
`

export default ProductListDisplay;
