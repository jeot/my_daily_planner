import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "./../react-auth0-spa";

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <nav className="navbar navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                {!isAuthenticated && "SHK's Website!"}
                {isAuthenticated && "My Daily Planner App"}
            </Link>
            {!isAuthenticated && (
                <button
                    className="btn btn-sm btn-outline-success px-2"
                    onClick={() => loginWithRedirect({})}
                >
                    Log in
                </button>
            )}

            {isAuthenticated && (
                <div>
                    <Link to="profile">
                        <span className="px-2">{user.nickname}</span>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle px-2"
                            width="50"
                        />
                    </Link>
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
