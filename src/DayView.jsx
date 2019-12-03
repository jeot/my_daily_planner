import React, { Component } from "react";

class DayView extends Component {
    constructor(props) {
        super(props);
        this.state = { date: props.date };
    }

    render() {
        return "Today is " + this.state.date;
    }
}

export default DayView;
