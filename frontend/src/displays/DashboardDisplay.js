import React from 'react';
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    DashboardForm as DetailsForm,
    DashboardOrders as OrdersList,
} from "../components";

function DashboardDisplay() {
    const auth = useSelector(state => state.auth);
    const { user } = auth;

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

const Btn = styled.button`
    outline: none;
    border: none;
    background: none;
    color: orangered;
    margin-bottom: 2rem;
`

export default DashboardDisplay;
