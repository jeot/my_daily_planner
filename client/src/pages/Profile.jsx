import React, { Component } from "react";
import { useAuth0 } from "./../react-auth0-spa";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className="container">
            {isAuthenticated && (
                <div>
                    <h1>Hi {user.name}</h1>
                    <p>Your detail is:</p>

                    <code>{JSON.stringify(user)}</code>
                </div>
            )}
            {!isAuthenticated && (
                <div>
                    <h1>Please log in first.</h1>
                </div>
            )}
        </div>
    );
};

export default Profile;
