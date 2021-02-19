import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./manager";
import App from "./App";
import "./manager/css/bootstrap.min.css";
import "./manager/css/index.css";

ReactDOM.render(
    <AppProvider>
        <App/>
    </AppProvider>, document.getElementById("root")
);