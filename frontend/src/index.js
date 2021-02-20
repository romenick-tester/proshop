import React from "react";
import ReactDOM from "react-dom";
import { ProductsProvider } from "./settings";
import App from "./App";
import "./settings/css/bootstrap.min.css";
import "./settings/css/index.css";

ReactDOM.render(
    <ProductsProvider>
        <App/>
    </ProductsProvider>, document.getElementById("root")
);