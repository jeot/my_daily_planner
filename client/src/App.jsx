import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import List from "./pages/List";
import NotFound from "./pages/NotFound";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					Link elements:
					<Link to="/">Home</Link>
					<Link to="/list">List</Link>
					<Link to="/users">Users</Link>
					<Link to="/users/1">Users1</Link>
					<Link to="/users/2">Users2</Link>
					<Link to="/users/3">Users3</Link>
					<Link to="/not_defined">Not Defined</Link>
				</div>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/list" component={List} />
						<Route exact path="/users" component={Users} />
						<Route exact path="/users/:id" component={Users} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
