import React, { Component } from "react";

class TodoList extends Component {
	state = {};
	render() {
		return (
			<div className="card m-2" style={{ width: "18rem" }}>
				<div className="card-body">
					{this.props.isImportant && (
						<h6 className="card-title">Important Todos:</h6>
					)}
					{!this.props.isImportant && (
						<h6 className="card-title">Simple Todos:</h6>
					)}

					<ul>
						{this.props.todos.map(todo => (
							<li>{todo.title}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default TodoList;
