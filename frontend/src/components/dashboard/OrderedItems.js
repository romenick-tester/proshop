import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { FaTimes, FaCheck, FaInfo } from "react-icons/fa";
import { formatPrice } from "../../manager";

function OrderItem({ list }) {

    return (
        <Table striped bordered hover responsive className="table-sm">
            <THEAD>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
            </THEAD>
            <TBODY>
                {list.map((item) => {
                    const { _id: id, createdAt, totalPrice, isPaid, isDelivered } = item;

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{createdAt.substring(0, 10)}</td>
                            <td id="price">{formatPrice(totalPrice)}</td>
                            <td>{isPaid ? <FaCheck className="icon-check" /> : <FaTimes className="icon-x" />}</td>
                            <td>{isDelivered ? <FaCheck className="icon-check" /> : <FaTimes className="icon-x" />}</td>
                            <td><Link to={`/order/${id}`}><FaInfo /></Link></td>
                        </tr>
                    )
                })}
            </TBODY>
        </Table>
    )
}

const THEAD = styled.thead`
    text-align: center;
    font-size: 1rem;
`
const TBODY = styled.tbody`
    text-align: center;
    font-size: 1rem;

    .icon-check {
        color: green;
    }

    .icon-x {
        color: red;
    }

    #price {
        text-align: left;
        padding-left: 0.5rem;
    }
`

export default OrderItem;
