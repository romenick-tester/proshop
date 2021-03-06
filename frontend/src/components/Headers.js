import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../manager";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";
import {FaShoppingCart, FaSignInAlt } from "react-icons/fa";

function Headers() {
    const dispatch = useDispatch();
    const { auth_loading: loading, isAuthenticated } = useSelector(state => state.auth);

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Proshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><FaShoppingCart/> Cart</Nav.Link>
                            </LinkContainer>
                            {!loading && isAuthenticated ? (
                                <LinkContainer to="" onClick={() => dispatch(logoutUser())}>
                                    <Nav.Link><FaSignInAlt /> Logout</Nav.Link>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><FaSignInAlt/> Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Headers;
