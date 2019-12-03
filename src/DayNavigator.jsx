import React, { Component } from "react";

class DayNavigator extends Component {
    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-outline-dark m-2"
                    onClick={() => this.props.onDayShift(-1)}
                >
                    previous day
                </button>
                <button
                    className="btn btn-primary m-2"
                    onClick={() => this.props.onDayShift(0)}
                >
                    today
                </button>
                <button
                    className="btn btn-outline-dark m-2"
                    onClick={() => this.props.onDayShift(1)}
                >
                    next day
                </button>
            </div>
        );
    }
}

export default DayNavigator;
