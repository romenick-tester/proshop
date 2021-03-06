import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const { auth_loading, isAuthenticated } = useSelector(state => state.auth);

    return <Route {...rest} render={(props) => !auth_loading && isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />} />
}

export default PrivateRoute;
