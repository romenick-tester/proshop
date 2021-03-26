import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../manager";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer, Loader, Message } from "../components";

import "../manager/styling/inline.css"

function UserEditDisplay({ history, location }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })

    const { name, email, password, password2 } = form;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const nameRef = useRef(null);
    const passwordRef1 = useRef(null);
    const passwordRef2 = useRef(null);

    const dispatch = useDispatch();
    const { loading, error, authenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (!loading && authenticated) {
            history.push("/dashboard");
        }
    }, [loading, authenticated, history])

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== password2) {
            passwordRef1.current.classList.add("form-alert");
            passwordRef2.current.classList.add("form-alert");

        } else {
            dispatch(registerUser(form));
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {loading ? <Loader /> : error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        minLength={6}
                        ref={passwordRef1}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required />
                </Form.Group>
                <Form.Group controlId="password2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        minLength={6}
                        ref={passwordRef2}
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
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserEditDisplay;
