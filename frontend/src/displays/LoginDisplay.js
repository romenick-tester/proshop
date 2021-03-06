import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../manager";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components";

function LoginDisplay() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { email, password } = form;

    const redirect = "";

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(form);
        //dispatch(loginUser(form));
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row>
                <Col>
                    New Customer ? {" "}
                    <Link to={redirect ? `/auth/register?redirect=${redirect}` : "/auth/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginDisplay;
