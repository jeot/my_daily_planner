import React, { Component } from "react";
import Todo from "./Todo";
import Button from "@material-ui/core/Button";

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

                    {this.props.todos.map(t => (
                        <Todo key={t.id} todo={t} />
                    ))}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => console.log("button clicked!")}
                    >
                        Add New Todo
                    </Button>
                </div>
            </div>
        );
    }
}

export default TodoList;
