import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
    const props = {
        animation: "border",
        role: "status",
        style: { 
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block"
        }
    }

    return (
        <Spinner {...props}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
