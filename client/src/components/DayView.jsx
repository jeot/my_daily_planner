import React, { Component } from "react";

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
						{this.props.date.toDateString()}
					</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						View of the day
					</h6>
					<p className="card-text">
						T! Some quick example text to build on the card title
						and make up the bulk of the card's content.
					</p>
					<a href="google.com" className="card-link">
						Card link
					</a>
				</div>
			</div>
		);
	}
}

export default DayView;
