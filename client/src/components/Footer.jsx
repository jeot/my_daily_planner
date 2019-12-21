import React, { Component } from "react";
import TodayInformation from "../components/TodayInformation";

class Footer extends Component {
	state = {};
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<span className="text-muted">
						<TodayInformation />
					</span>
				</div>
			</footer>
		);
	}
}

export default Footer;
