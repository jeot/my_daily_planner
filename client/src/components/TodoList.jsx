import React, { Component } from "react";
import Todo from "./Todo";
import Button from "@material-ui/core/Button";

class TodoList extends Component {
	constructor(props) {
		super(props);
	}
	handleOnClick = () => {
		this.props.onAddNewTodoClick(this.props.type);
	};

	render() {
		return (
			<div className="card m-2" style={{ width: "18rem" }}>
				<div className="card-body">
					{this.props.type === "important" && (
						<h6 className="card-title">Important Todos:</h6>
					)}
					{this.props.type === "simple" && (
						<h6 className="card-title">Simple Todos:</h6>
					)}

					{this.props.todos.map(t => (
						<Todo key={t.id} todo={t} />
					))}
					<Button
						variant="contained"
						color="primary"
						disableElevation
						onClick={this.handleOnClick}
					>
						Add New Todo
					</Button>
				</div>
			</div>
		);
	}
}

export default TodoList;
