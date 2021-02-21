import React from "react";
import { Row, Col } from "react-bootstrap";

function Message({ variant, children }) {
    const value = {
        danger: "orangered",
        warning: "orange",
        success: "lightgreen",
        info: "blue"
    }

    return (
        <Row>
            <Col className="text-center" style={{color: value[variant]}}>
                <h1>{children}</h1>
            </Col>
        </Row>
    )
}

Message.defaultProps = {
    variant: "info"
}

export default Message;
