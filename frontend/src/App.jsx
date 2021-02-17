import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Header, Footer, Navbar} from "./components";
import {HomeDisplay} from "./displays";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={HomeDisplay} />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default App;
