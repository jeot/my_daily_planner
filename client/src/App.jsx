import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import BounceLoader from "react-spinners/BounceLoader";

import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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
			<NavBar />
			<Switch>
				{!isAuthenticated && (
					<Route exact path="/" component={WelcomePage} />
				)}
				{isAuthenticated && (
					<Route
						exact
						path="/"
						render={props => (
							<MyDailyPlannerApp
								{...props}
								user={user}
								isAuthenticated={isAuthenticated}
							/>
						)}
					/>
				)}
				<PrivateRoute exact path="/profile" component={Profile} />
				<Route component={NotFound} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
