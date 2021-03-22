import React, { useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "./manager";
import { Route, Switch } from "react-router-dom";
import { Header, Footer } from "./components";
import {
    HomeDisplay,
    SingleProductDisplay,
    ErrorDisplay as NotFoundDisplay,
    CartDisplay,
    LoginDisplay,
    RegisterDisplay,
    PrivateRoute,
    DashboardDisplay,
    ShippingDisplay,
    PaymentDisplay,
} from "./displays";

function App() {
    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (authenticated) {
            dispatch(getDetails());
        }
    }, [dispatch, authenticated]);

    return (
        <>
            <Route render={({ history }) => <Header history={history} />} />
            <Main>
                <Container>
                    <Switch>
                        <PrivateRoute path="/payment" component={PaymentDisplay} />
                        <PrivateRoute path="/shipping" component={ShippingDisplay} />
                        <PrivateRoute path="/dashboard" component={DashboardDisplay} />
                        <Route path="/register" component={RegisterDisplay} />
                        <Route path="/login" component={LoginDisplay} />
                        <Route path="/cart/:id?" component={CartDisplay} />
                        <Route path="/product/:id" component={SingleProductDisplay} />
                        <Route path="/" exact component={HomeDisplay} />
                        <Route path="*" component={NotFoundDisplay} />
                    </Switch>
                </Container>
            </Main>
            <Footer />
        </>
    )
}

const Main = styled.main`
    height: 95vh;
    padding-top: 2rem;
`

export default App;
