import React, { Component } from "react";
import NavBar from "./NavBar";
import DayView from "./DayView";
import DayNavigator from "./DayNavigator";
import TodayInformation from "./TodayInformation";

const API_URL = "/api";
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
        this.callApiId(5);
    }

    callApiId = async id => {
        let resText = "";
        let response = null;
        try {
            const url = "/api_id?query_id=" + id;
            response = await fetch(url);
            console.log("response:", response);
            resText = await response.text(); // Parse it as text
            const data = JSON.parse(resText); // Try to parse it as json
            // Do your JSON handling here
            console.log("json data:", data);
        } catch (err) {
            // This probably means your response is text, do you text handling here
            console.log("it is a text:", resText);
        }
    };

    callApi = async () => {
        let resText = "";
        let response = null;
        try {
            response = await fetch(API_URL);
            console.log("response:", response);
            resText = await response.text(); // Parse it as text
            const data = JSON.parse(resText); // Try to parse it as json
            // Do your JSON handling here
            console.log("json data:", data);
        } catch (err) {
            // This probably means your response is text, do you text handling here
            console.log("it is a text:", resText);
        }
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
