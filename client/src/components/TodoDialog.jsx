import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TodoDialog = props => {
	const { onClose, open, type, date } = props;

	const [newTodoTitle, setNewTodoTitle] = useState("");
	const [newTodoDescription, setNewTodoDescription] = useState("");
	const [newTodoDuration, setNewTodoDuration] = useState(3600);
	const [newTodoType, setNewTodoType] = useState(type);
	const [newTodoDate, setNewTodoDate] = useState(date);

	const handleOnChangeTitle = event => {
		setNewTodoTitle(event.target.value);
	};
	const handleOnChangeDescription = event => {
		setNewTodoDescription(event.target.value);
	};

	const handleDone = () => {
		let newTodo = {
			id: null,
			user_id: null,
			datetime: date,
			duration: newTodoDuration,
			time_valid: null,
			title: newTodoTitle,
			description: newTodoDescription,
			status: "do",
			type: type
		};
		// check
		if (newTodoTitle !== "") {
			onClose(newTodo);
		} else {
			// show the error...
		}
	};

	const handleClose = () => {
		onClose(null);
	};

	let dialogTitle = "";
	if (type === "simple") dialogTitle = "Add a Simple Todo";
	else if (type === "important") dialogTitle = "Add an Important Todo";
	else dialogTitle = "Add a Todo";

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ margin: 8 }}>
					{date
						.toString()
						.split(" ")
						.slice(0, 3)
						.join(" ")}
				</DialogContentText>
				<TextField
					autoFocus
					id="standard-basic"
					label="Title"
					type="text"
					variant="outlined"
					fullWidth
					margin="normal"
					onChange={handleOnChangeTitle}
				/>
				<TextField
					id="outlined-multiline-static"
					label="Description"
					multiline
					rows="4"
					placeholder="Description..."
					variant="outlined"
					fullWidth
					margin="normal"
					onChange={handleOnChangeDescription}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleDone} color="primary">
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TodoDialog;
