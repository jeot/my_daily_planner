import React, { Component } from "react";
import DayView from "../components/DayView";
import DayNavigator from "../components/DayNavigator";
import TodoDialog from "../components/TodoDialog";

const POST_TODOS_URL = "/todos";
const POST_NEW_TODO_URL = "/new_todo";
class MyDailyPlannerApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			todos: [],
			fetching: true,
			result: false,
			todoDialogOpen: false,
			todoDialogOpenType: "simple"
		};
		this.onDayShift = this.onDayShift.bind(this);
	}

	componentDidMount() {
		console.log("calling backend get_todos api...");
		this.getTodos(this.state.date);
	}

	getTodos = async wantingDate => {
		try {
			this.setState({ fetching: true });
			const rawResponse = await fetch(POST_TODOS_URL, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					user: this.props.user,
					date: wantingDate
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
				date: wantingDate,
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
				date: wantingDate,
				fetching: false,
				result: false
			});
		}
	};

	addNewTodo = async newTodo => {
		try {
			//this.setState({ process_new_todo: true });
			const rawResponse = await fetch(POST_NEW_TODO_URL, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					user: this.props.user,
					date: newTodo.date,
					todo: newTodo
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
				result: true
			});
			this.getTodos(this.state.date);
		} catch (error) {
			console.log(
				"There has been a problem with your fetch operation: ",
				error.message
			);
			this.setState({
				result: false
			});
		}
	};

	onDayShift(shift) {
		let currentDate = new Date(this.state.date);
		if (shift === 0) currentDate = new Date();
		else currentDate.setDate(currentDate.getDate() + shift);
		this.getTodos(currentDate);
	}

	handleTodoDialogOpen = type => {
		this.setState({ todoDialogOpenType: type });
		this.setState({ todoDialogOpen: true });
	};

	handleTodoDialogClose = newTodo => {
		this.setState({ todoDialogOpen: false });
		// handle the newTodo...
		console.log("handling new todo", newTodo);
		this.addNewTodo(newTodo);
	};

	handleAddNewTodoClick = type => {
		this.handleTodoDialogOpen(type);
	};

	render() {
		return (
			<div className="container">
				<DayNavigator onDayShift={this.onDayShift} />
				{this.state.fetching && (
					<p className="text-center text-wrap text-secondary">
						Loading...
					</p>
				)}
				{!this.state.fetching && this.state.result && (
					<DayView
						date={this.state.date}
						todos={this.state.todos}
						onAddNewTodoClick={this.handleAddNewTodoClick}
					/>
				)}
				{!this.state.fetching && !this.state.result && (
					<p className="text-center text-wrap text-danger">
						Something went wrong while getting the data from server!
						Sorry!
					</p>
				)}
				<TodoDialog
					onClose={this.handleTodoDialogClose}
					open={this.state.todoDialogOpen}
					type={this.state.todoDialogOpenType}
					date={this.state.date}
				/>
			</div>
		);
	}
}

export default MyDailyPlannerApp;
