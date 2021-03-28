import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../manager";
import {
    DashboardForm as DetailsForm,
    DashboardOrders as OrdersList,
    Paginate,
} from "../../components";

function DashboardDisplay({ match }) {
    const dispatch = useDispatch();

    const pageNumber = match.params.pageNumber || 1;

    const auth = useSelector(state => state.auth);
    const { authenticated, user } = auth;

    const { list, paid, pages, page } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getOrders(pageNumber));
    }, [dispatch, authenticated, paid, pageNumber]);

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
                <Row>
                    <Col>
                        <OrdersList />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Paginate pages={pages} page={page} root="dashboard" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DashboardDisplay;
