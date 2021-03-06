import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./manager";
import App from "./App";

import "./manager/miscs/source/bootstrap.min.css";
import "./manager/miscs/source/index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root")
);