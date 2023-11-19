import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "../cmponents/home"
import Login from "../cmponents/Login"
import User from "../cmponents/user"
import Admin from "../cmponents/admin"
import Dashboard from "../cmponents/dashboard";

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/user" component={User} />
                <Route path="/admin" component={Admin} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};
export default Routing;