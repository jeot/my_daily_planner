import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useAuth0 } from "./react-auth0-spa";

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Router>
            <div>
                Link elements:
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/not_defined">Not Defined</Link>
            </div>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile" component={Profile} />
                    <Route component={Home} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </div>
        </Router>
    );
};

export default App;
