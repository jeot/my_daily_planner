import React, { Component } from "react";

class Users extends Component {
    render() {
        console.log(this.props);
        const { params } = this.props.match;
        return (
            <div className="container">
                <h1>Users</h1>
                <h2>ID: {params.id}</h2>
            </div>
        );
    }
}

export default Users;
