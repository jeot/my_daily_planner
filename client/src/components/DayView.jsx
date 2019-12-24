import React, { Component } from "react";
import TodoList from "../components/TodoList";

class DayView extends Component {
	// constructor(props) {
	//     super(props);
	//     this.state = { date: props.date };
	// }

	render() {
		return (
			<div className="card m-2">
				<div className="card-body">
					<h5 className="card-title">
						View of the day of {this.props.date.toDateString()}
					</h5>
					<TodoList
						todos={this.props.todos.filter(
							todo => todo.type === "important"
						)}
						type="important"
					/>
					<TodoList
						todos={this.props.todos.filter(
							todo => todo.type === "simple"
						)}
						type="simple"
					/>
				</div>
			</div>
		);
	}
}

export default DayView;
