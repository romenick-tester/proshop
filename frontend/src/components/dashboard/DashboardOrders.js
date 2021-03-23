import React from 'react';
import { Link } from "react-router-dom";
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
            <ul>
                {list.map((item) => {
                    return (
                        <li>
                            <Link to={`/order/${item._id}`} >{item._id}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DashboardOrders;
