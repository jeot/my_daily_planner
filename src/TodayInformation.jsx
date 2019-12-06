import React, { Component } from "react";

class TodayInformation extends Component {
    state = { currentTime: new Date() };
    timerID = null;
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({ currentTime: new Date() });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <p className="m-2">
                Today is{" "}
                {this.state.currentTime
                    .toString()
                    .split(" ")
                    .slice(0, 5)
                    .join(" ")}
            </p>
        );
    }
}

export default TodayInformation;
