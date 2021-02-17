import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {FaShoppingCart, FaSignInAlt } from "react-icons/fa";

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Proshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart"><FaShoppingCart/> Cart</Nav.Link>
                        <Nav.Link href="/login"><FaSignInAlt/> Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;
