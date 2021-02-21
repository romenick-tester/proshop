import React from "react";
import ReactDOM from "react-dom";
import { ProductsProvider } from "./settings";
import { Provider } from "react-redux";
import { store } from "./settings"
import App from "./App";
import "./settings/css/bootstrap.min.css";
import "./settings/css/index.css";

ReactDOM.render(
    <Provider store={store}>
        <ProductsProvider>
            <App/>
        </ProductsProvider>
    </Provider>, document.getElementById("root")
);