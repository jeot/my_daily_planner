import React, { Component } from "react";
import NavBar from "./NavBar";
import DayView from "./DayView";
import DayNavigator from "./DayNavigator";
import TodayInformation from "./TodayInformation";

class App extends Component {
    state = { date: new Date() };
    constructor(props) {
        super(props);
        this.onDayShift = this.onDayShift.bind(this);
    }

    onDayShift(shift) {
        let currentDate = this.state.date;
        if (shift === 0) currentDate = new Date();
        else currentDate.setDate(currentDate.getDate() + shift);
        this.setState({
            date: currentDate
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <TodayInformation date={new Date()} />
                    <DayNavigator onDayShift={this.onDayShift} />
                    <DayView date={this.state.date} />
                </div>
            </div>
        );
    }
}

export default App;
