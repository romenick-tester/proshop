import React from 'react';
import { useSelector } from "react-redux";
import { Message, Loader } from "../reuseable";

function DashboardOrders() {

    const { loading, error, list } = useSelector(state => state.order)

    return (
        <>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            <h2>Orders:</h2>
            {list && list.length === 0 && <h4>You don't have any orders</h4>}
            {list.map((item) => {
                return <h6>order history</h6>
            })}
        </>
    )
}

export default DashboardOrders;
