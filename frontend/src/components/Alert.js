import React from "react";
import { Alert as Div } from "react-bootstrap";

function Alert({ variant, children }) {
    return (
        <Div variant={variant} className="text-center">
            {children}
        </Div>
    )
}

Alert.defaultProps = {
    variant: "info"
}

export default Alert
