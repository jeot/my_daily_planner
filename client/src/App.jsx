import React, { Component } from "react";
import NavBar from "./NavBar";
import DayView from "./DayView";
import DayNavigator from "./DayNavigator";
import TodayInformation from "./TodayInformation";

const API_URL = "http://localhost:5000/api";
class App extends Component {
    state = { date: new Date(), data: null };
    constructor(props) {
        super(props);
        this.onDayShift = this.onDayShift.bind(this);
    }
    componentDidMount() {
        console.log("calling backend api...");
        // fetch data from backend
        this.callApi();
    }

    callApi = async () => {
        const response = await fetch(API_URL);
        // if it is a json response:
        const myJson = await response.json();
        console.log("myJson:", myJson);
        const jsonText = JSON.stringify(myJson);
        console.log("jsonText:", jsonText);

        // if it is a text response:
        // const myText = await response.text();
        // console.log("myText:", myText);
    };

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
                <p>data:</p>
                <p>{this.state.data}</p>
            </div>
        );
    }
}

export default App;
