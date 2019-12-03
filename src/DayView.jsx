import React, { Component } from "react";

class DayView extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { date: props.date };
    // }

    render() {
        return (
            <div className="card m-2">
                <div class="card-body">
                    View of {this.props.date.toDateString()}
                </div>
            </div>
        );
    }
}

export default DayView;
