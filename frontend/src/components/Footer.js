import React from "react";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    const currentYear = moment().format("YYYY");

    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <small>Copyright &copy; {currentYear}</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
