import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import History from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Router history={History}>
            <header>
                <NavBar />
            </header>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
