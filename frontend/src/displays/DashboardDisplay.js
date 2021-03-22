import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../manager";
import { DashboardForm as DetailsForm, DashboardOrders as OrdersList } from "../components";

function DashboardDisplay() {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { authenticated, user } = auth;

    useEffect(() => {
        if (authenticated) {
            dispatch(getOrders());
        }
    }, [dispatch, authenticated])

    return (
        <Row>
            <Col md={4}>
                <DetailsForm user={user} />
            </Col>
            <Col md={8}>
                <OrdersList />
            </Col>

        </Row>
    )
}

export default DashboardDisplay;
