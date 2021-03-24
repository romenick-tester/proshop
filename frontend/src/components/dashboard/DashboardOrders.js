import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Message, Loader } from "../reuseable";
import OrderedItems from "./OrderedItems";

function DashboardOrders() {
    const { loading, error, list } = useSelector(state => state.order)

    return (
        <Wrapper>
            <h2>Orders:</h2>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            {list && list.length === 0 && <h4>You don't have any orders</h4>}
            {list && <OrderedItems list={list} />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 2rem;
`

export default DashboardOrders;
