import React, { Component } from "react";
import DayView from "../components/DayView";
import DayNavigator from "../components/DayNavigator";

const POST_TODOS_URL = "/todos";
class MyDailyPlannerApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			todos: [],
			fetching: true,
			result: false
		};
		this.onDayShift = this.onDayShift.bind(this);
	}

	componentDidMount() {
		console.log("calling backend get_todos api...");
		this.getTodos();
	}

	getTodos = async () => {
		try {
			const rawResponse = await fetch(POST_TODOS_URL, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					user: this.props.user,
					date: this.state.date
				})
			});
			console.log(rawResponse);
			if (!rawResponse.ok) {
				throw new Error("Network response was not ok.");
			}
			if (rawResponse.status !== 200) {
				throw new Error("response status was not 200.");
			}
			const content = await rawResponse.json();
			console.log("content", content);
			this.setState({
				todos: content,
				fetching: false,
				result: true
			});
		} catch (error) {
			console.log(
				"There has been a problem with your fetch operation: ",
				error.message
			);
			this.setState({
				fetching: false,
				result: false
			});
		}
	};

	onDayShift(shift) {
		let currentDate = this.state.date;
		if (shift === 0) currentDate = new Date();
		else currentDate.setDate(currentDate.getDate() + shift);
		this.setState({
			date: currentDate
		});
		console.log(this.state);
	}

	render() {
		if (this.state.fetching)
			return (
				<div className="container">
					<p className="text-center text-wrap text-secondary">
						Loading...
					</p>
				</div>
			);
		if (this.state.result)
			return (
				<div className="container">
					<DayNavigator onDayShift={this.onDayShift} />
					<DayView date={this.state.date} todos={this.state.todos} />
				</div>
			);
		return (
			<div className="container">
				<DayNavigator onDayShift={this.onDayShift} />
				<p className="text-center text-wrap text-danger">
					Something went wrong while getting the data from server!
					Sorry!
				</p>
			</div>
		);
	}
}

export default MyDailyPlannerApp;
