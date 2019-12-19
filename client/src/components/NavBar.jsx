import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "./../react-auth0-spa";

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log("user:", user);
    return (
        <nav className="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/">
                <img
                    src="http://freevectorlogo.net/wp-content/uploads/2011/04/starbucks-logo-vector-200x200.png"
                    width="35"
                    height="35"
                    alt=""
                    className="d-inline-block align-top"
                />
                My Daily Planner
            </a>
            {!isAuthenticated && (
                <button
                    className="btn btn-outline-success m-2"
                    onClick={() => loginWithRedirect({})}
                >
                    Log in
                </button>
            )}

            {isAuthenticated && (
                <div>
                    <a href="profile">
                        <span className="px-2">{user.nickname}</span>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle px-2"
                            width="50"
                        />
                    </a>
                    <button
                        className="btn btn-sm btn-outline-secondary px-2"
                        onClick={() => logout()}
                    >
                        Log out
                    </button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
