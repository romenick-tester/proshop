import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../manager";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaSignInAlt, FaUserAlt } from "react-icons/fa";

function Headers({ history }) {
    const dispatch = useDispatch();
    const { loading, authenticated, user } = useSelector(state => state.auth);
    const { name = "" } = user;
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
                                <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                            </LinkContainer>
                            {!loading && authenticated ? (
                                <NavDropdown title={name} id="username">
                                    <NavDropdown.Item onClick={() => history.push("/dashboard")}>
                                        <FaUserAlt /> Dashboard
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                                        <FaSignInAlt /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign In
                                    </Nav.Link>
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
