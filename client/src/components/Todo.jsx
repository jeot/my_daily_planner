import React, { Component } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Todo extends Component {
	handleChange = event => {
		console.log("check state:", event.target.checked);
	};

	render() {
		return (
			<FormControlLabel
				style={{ width: "100%" }}
				control={
					<Checkbox
						checked={this.props.todo.isDone}
						color="secondary"
						onChange={this.handleChange}
						value=""
					/>
				}
				label={this.props.todo.title}
			/>
		);
	}
}

export default Todo;
