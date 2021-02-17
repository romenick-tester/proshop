import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Header, Footer} from "./components";
import {
    HomeDisplay, 
    SingleProductDisplay,
    ErrorDisplay
} from "./displays";

function App() {
    return (
        <Router>
            <Header/>
            <main>
                <Container>
                    <Switch>
                        <Route path="/" exact component={HomeDisplay} />
                        <Route path="/product/:id" component={SingleProductDisplay} />
                        <Route path="*" component={ErrorDisplay} />
                    </Switch>
                </Container>
            </main>
            <Footer/>
        </Router>
    )
}

export default App;
