import React, { Component } from "react";

class TodayInformation extends Component {
    render() {
        return <p className="m-2">Today is {this.props.date.toString()}</p>;
    }
}

export default TodayInformation;
