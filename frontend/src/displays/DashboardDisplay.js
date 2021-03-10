import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../manager";
import { USER_UPDATE_DETAILS_ERROR } from "../manager/redux/constants/userConstants";
import { FormContainer, Loader, Message } from "../components";

function DashboardDisplay() {
    const {
        user_details_loading: loading,
        user_details_error: error,
        user_details: details } = useSelector(state => state.userDetails);
    const { name: user = "", email: username = "" } = details;

    const [form, setForm] = useState({
        name: !loading && user && user,
        email: !loading && username && username,
        password: "",
        password2: "",
    })

    const { name, email, password, password2 } = form;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== password2) {
            dispatch({ type: USER_UPDATE_DETAILS_ERROR, payload: "Password do not match!" });
        } else {
            dispatch(updateUserDetails({ name, email, password }));
        }
    }

    return (
        <Row>
            <Col md={4}>
                <h1>Update Details</h1>
                {loading ? <Loader /> : error && <Message variant="danger">{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Full Name"
                            value={name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="password2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e) => setForm({ ...form, password2: e.target.value })} />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>Orders:</h2>

            </Col>
        </Row>
    )
}

export default DashboardDisplay;
