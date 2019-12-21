import React, { Component } from "react";
import DayView from "../components/DayView";
import DayNavigator from "../components/DayNavigator";

const API_URL = "/api";
class MyDailyPlannerApp extends Component {
	state = { date: new Date() };
	constructor(props) {
		super(props);
		this.onDayShift = this.onDayShift.bind(this);
	}

	componentDidMount() {
		console.log("calling backend api...");
		// fetch data from backend
		this.callApi();
	}

	callApi = async () => {
		let resText = "";
		let response = null;
		try {
			response = await fetch(API_URL);
			console.log("response:", response);
			resText = await response.text(); // Parse it as text
			const data = JSON.parse(resText); // Try to parse it as json
			// Do your JSON handling here
			console.log("json data:", data);
		} catch (err) {
			// This probably means your response is text, do you text handling here
			console.log("it is a text:", resText);
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

	TEST_TODOS = [
		{ isImportant: true, title: "important 123" },
		{ isImportant: false, title: "simple 123" },
		{ isImportant: false, title: "dsfsd" },
		{ isImportant: true, title: "buy milk" },
		{ isImportant: false, title: "kiss a frog!" }
	];

	render() {
		return (
			<div className="container">
				<DayNavigator onDayShift={this.onDayShift} />
				<DayView date={this.state.date} todos={this.TEST_TODOS} />
			</div>
		);
	}
}

export default MyDailyPlannerApp;
