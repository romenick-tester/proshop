import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function ErrorDisplay() {
    return (
        <Row>
            <Col className="text-center mt-3">
                <h1>Page Not Found!</h1>
                <Link to="/">Home</Link>
            </Col>
        </Row>
    )
}

export default ErrorDisplay;
