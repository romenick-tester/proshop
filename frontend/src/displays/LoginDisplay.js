import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../manager";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Message, Loader, FormContainer } from "../components";

function LoginDisplay({ history, location }) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { email, password } = form;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const emailInputRef = useRef(null);

    const dispatch = useDispatch();
    const { loading, error, authenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (!loading && authenticated) {
            history.push("/dashboard");
        }
    }, [loading, authenticated, history])

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading ? <Loader /> : error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        ref={emailInputRef}
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row>
                <Col>
                    New Customer ? {" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginDisplay;
