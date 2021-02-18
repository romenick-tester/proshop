import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./manager/context/globalContext";
import App from "./App";
import "./manager/bootstrap.min.css";
import "./manager/index.css";

ReactDOM.render(
    <AppProvider>
        <App/>
    </AppProvider>, document.getElementById("root")
);