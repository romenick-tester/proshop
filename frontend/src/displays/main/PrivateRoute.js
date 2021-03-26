import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const { loading, authenticated } = useSelector(state => state.auth);

    return <Route {...rest} render={(props) => !loading && authenticated ? <Component {...props} /> : <Redirect to="/login" />} />
}

export default PrivateRoute;
