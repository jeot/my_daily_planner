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
                    <h5 class="card-title">{this.props.date.toDateString()}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        View of the day
                    </h6>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <a href="google.com" class="card-link">
                        Card link
                    </a>
                </div>
            </div>
        );
    }
}

export default DayView;
