  

/* a private road component: the point of creating private road component 
is when you want to render some component honest to the logged in users.
It helps to be sure that this is only accessible by the authenticate users.*/

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

/* flexible way of implementing authentication forcing users to authenticate to access certain
drugs certain components.*/

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route // this Route will take the rest of the props & render using the arrow function 
        {...rest}
        render={props => // if authenticated it will render otherwise redirect the user
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;