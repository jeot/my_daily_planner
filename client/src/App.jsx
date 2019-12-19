import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import BounceLoader from "react-spinners/BounceLoader";

import { useAuth0, Auth0Context } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import MyDailyPlannerApp from "./pages/MyDailyPlannerApp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import History from "./utils/history";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
    const { user, isAuthenticated, loading } = useAuth0();
    const spinner = (
        <div
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}
        >
            <BounceLoader size={50} color={"#123abc"} loading={loading} />
        </div>
    );

    if (loading) {
        return spinner;
    }
    return (
        <Router history={History}>
            <header>
                <NavBar />
            </header>
            <Switch>
                {!isAuthenticated && (
                    <Route exact path="/" component={WelcomePage} />
                )}
                {isAuthenticated && (
                    <Route exact path="/" component={MyDailyPlannerApp} />
                )}
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
