import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../manager";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components";

function RegisterDisplay() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })

    const { name, email, password, password2 } = form;

    const redirect = "";

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== password2) {
            console.log("Password do not match!");
        } else {
            dispatch(registerUser({ name, email, password }));
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
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
                    Register
                </Button>
            </Form>

            <Row>
                <Col>
                    Already registered ? {" "}
                    <Link to={redirect ? `/auth/login?redirect=${redirect}` : "/auth/login"}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterDisplay;
