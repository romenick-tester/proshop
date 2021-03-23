import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children, center = false }) {

    return (
        <Alert variant={variant} className={center ? "text-center" : null}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: "info"
}

export default Message;
