import React, { useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reAuthenticate, getUserDetails } from "./manager";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, ViewUsers } from "./components";
import {
    HomeDisplay, 
    SingleProductDisplay,
    ErrorDisplay,
    CartDisplay,
    LoginDisplay,
    RegisterDisplay,
    PrivateRoute,
    DashboardDisplay,
} from "./displays";

function App() {
    const dispatch = useDispatch();
    const { user: { token } } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(reAuthenticate());
            dispatch(getUserDetails(token));
        }
    }, [token]);

    return (
        <Router>
            <Header/>
            <Main>
                <Container>
                    <Switch>
                        <PrivateRoute path="/dashboard" component={DashboardDisplay} />
                        <Route path="/register" component={RegisterDisplay} />
                        <Route path="/login" component={LoginDisplay} />
                        <Route path="/cart/:id?" component={CartDisplay} />
                        <Route path="/product/:id" component={SingleProductDisplay} />
                        <Route path="/" exact component={HomeDisplay} />
                        <Route path="*" component={ErrorDisplay} />
                    </Switch>
                </Container>
            </Main>
            {/* <ViewUsers /> */}
            <Footer/>
        </Router>
    )
}

const Main = styled.main`
    height: 95vh;
`

export default App;
