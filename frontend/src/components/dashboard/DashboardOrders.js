import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Message, Loader } from "../reuseable";

function DashboardOrders() {
    const { loading, error, list } = useSelector(state => state.order)

    return (
        <Wrapper>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            <h2>Orders:</h2>
            <hr />
            {list && list.length === 0 && <h4>You don't have any orders</h4>}
            <ul>
                {list.map((item) => {
                    return (
                        <li key={item._id}>
                            <Link to={`/order/${item._id}`} >{item._id}</Link>
                        </li>
                    )
                })}
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 2rem;

    ul {
        list-style: none;
    }
`

export default DashboardOrders;
