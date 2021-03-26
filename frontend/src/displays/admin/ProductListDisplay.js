import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { Loader, Message } from "../../components";
import { getProducts, deleteProductById } from "../../manager";

function ProductListDisplay({ match }) {

    const dispatch = useDispatch();

    const { loading, error, list: products } = useSelector(state => state.product);

    const productById = useSelector(state => state.productById);
    const { loading: deleting, error: delete_error, deleted } = productById;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, deleted]);

    if (loading || (!loading && deleting)) {
        return <Loader />
    }

    if (error || (!error && delete_error)) {
        return <Message variant="danger">{error}</Message>
    }

    const createProductHandler = (product) => {
        console.log(product);
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
                    <Button className="btn-sm my-3" onClick={() => createProductHandler("created!")}>
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
                                <td>{price}</td>
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
