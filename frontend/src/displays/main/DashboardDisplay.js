import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../manager";
import {
    DashboardForm as DetailsForm,
    DashboardOrders as OrdersList
} from "../../components";

function DashboardDisplay() {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { authenticated, user } = auth;

    const { list, paid } = useSelector(state => state.order);

    useEffect(() => {
        if (authenticated || paid) {
            dispatch(getOrders());
        }
    }, [dispatch, authenticated, paid]);

    useEffect(() => {
        if (list) {
            dispatch(getOrders);
        }
    }, [dispatch, list])

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
