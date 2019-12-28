import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TodoDialog = props => {
	const { onClose, open, type } = props;

	const handleDone = () => {
		// check the inputs...
		// ...
		let newTodo = {
			title: "hello world",
			description: "desc...",
			duration: 3333
		};
		let check = true;

		if (check) onClose(newTodo);
		else {
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
				<DialogContentText style={{ margin: 8 }}></DialogContentText>
				<TextField
					autoFocus
					id="standard-basic"
					label="Title"
					type="text"
					variant="outlined"
					fullWidth
					margin="normal"
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
