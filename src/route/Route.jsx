import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "../cmponents/home"
import Login from "../cmponents/Login"
import User from "../cmponents/user"

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/user" component={User} />
            </Switch>
        </Router>
    );
};
export default Routing;