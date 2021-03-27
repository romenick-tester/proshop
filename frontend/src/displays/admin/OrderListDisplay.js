import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from "react-bootstrap";
import { Loader, Message } from "../../components";
import { formatPrice, getAllOrders } from '../../manager';

function OrderListDisplay() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const orderAdmin = useSelector(state => state.orderAdmin);
    const { loading, error, list: orders } = orderAdmin;

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    return (
        <Table striped bordered hover responsive className="table-sm">
            <THEAD>
                <tr>
                    <th>
                        <h2>ORDERS</h2>
                    </th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>
                        USER {" "}
                        <span
                            style={{ color: "skyblue", cursor: "pointer" }}
                            onClick={() => setShow(!show)}
                        >
                            (show id)
                        </span>
                    </th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>DATE</th>
                    <th></th>
                </tr>
            </THEAD>
            <TBODY>
                {orders.map((order) => {
                    const { _id, user, totalPrice, isPaid, isDelivered, createdAt, paidAt, deliveredAt } = order;

                    const { _id: id = "", name = "" } = user ? user : {};
                    return (
                        <tr key={_id}>
                            <td style={{ width: "200px" }}>{_id}</td>
                            <td style={{ width: "275px" }}>
                                {name} {" "}
                                {show && `(${id})`}
                            </td>
                            <td>{formatPrice(totalPrice)}</td>
                            <td style={{ width: "100px" }}>
                                {!isPaid ? <FaTimes className="icon-x" /> : (
                                    <>
                                        <FaCheck className="icon-check" />
                                        {paidAt.substring(0, 10)}
                                    </>
                                )}
                            </td>
                            <td style={{ width: "100px" }}>
                                {!isDelivered ? <FaTimes className="icon-x" /> : (
                                    <>
                                        <FaCheck className="icon-check" />
                                        {deliveredAt.substring(0, 10)}
                                    </>
                                )}
                            </td>
                            <td>{createdAt.substring(0, 10)}</td>
                            <td>
                                <LinkContainer to={`/order/${_id}`} >
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                {/* <Button variant="danger" className="btn-sm" onClick={() => deleteUserHandler(_id)}>
                                    <FaTrash />
                                </Button> */}
                            </td>
                        </tr>
                    )
                })}
            </TBODY>
        </Table>
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

export default OrderListDisplay;
