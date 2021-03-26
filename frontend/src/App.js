import React, { useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./manager";
import { Route, Switch } from "react-router-dom";
import { Header as Navbar, Footer } from "./components";
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
    PlaceOrderDisplay,
    OrderDisplay,
    UserListDisplay,
    ProductListDisplay,
    OrderListDisplay,
    UserEditDisplay,
    ProductEditDisplay,
} from "./displays";

function App() {
    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (authenticated) {
            dispatch(getUserDetails());
        }
    }, [dispatch, authenticated]);

    return (
        <>
            <Route render={({ history }) => <Navbar history={history} />} />
            <Main>
                <Container>
                    <Switch>
                        <PrivateRoute path="/admin/product/:id/edit" component={ProductEditDisplay} />
                        <PrivateRoute path="/admin/user/:id/edit" component={UserEditDisplay} />
                        <PrivateRoute path="/admin/orders" component={OrderListDisplay} />
                        <PrivateRoute path="/admin/products" component={ProductListDisplay} />
                        <PrivateRoute path="/admin/users" component={UserListDisplay} />
                        <PrivateRoute path="/order/:id" component={OrderDisplay} />
                        <PrivateRoute path="/placeorder" component={PlaceOrderDisplay} />
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
    min-height: 100vh;
    padding: 2rem 0;
`

export default App;
