import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ProductsProvider, store } from "./settings";

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