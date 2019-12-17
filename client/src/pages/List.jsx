import React, { Component } from "react";

class List extends Component {
	componentDidMount() {
		this.timerID = setTimeout(() => {
			console.log("5 second time out");
			this.props.history.push("/");
		}, 5000);
	}
	componentWillUnmount() {
		clearTimeout(this.timerID);
	}
	render() {
		return (
			<div>
				We don't have anything here. Lets return after 5 seconds! :D
			</div>
		);
	}
}

export default List;
