import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import Button from "./Button";
import DayView from "./DayView";

function App() {
    return (
        <frameElement>
            <NavBar />
            <div className="container-fluid">
                <Button value="previous" />
                <DayView date={new Date()} />
                <Button value="next" />
            </div>
        </frameElement>
    );
}

export default App;
