import React, { Component } from "react";

class Button extends Component {
    state = {};
    render() {
        return (
            <button type="button" class="btn btn-outline-dark">
                {this.props.value}
            </button>
        );
    }
}

export default Button;
