import React, {Component} from "react";
import './App.css';
import Form from "./Form";
import Result from "./Result";

const APIKey = `12f903494b47b4cf20081fa2dce7d1c2`;

class App extends Component {

    state = {
        value: "",
        date: "",
        city: "",
        sunrise: "",
        sunset: "",
        temp: "",
        pressure: "",
        wind: "",
        err: false,
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handlerCitySubmit = (e) => {
        e.preventDefault()

        const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error("City not found")
            })
            .then(response => response.json())
            .then(data => {
                const date = new Date().toLocaleString();
                const temp = (data.main.temp).toFixed(1);
                this.setState(prevState => ({
                    err: false,
                    date,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    city: this.state.value,
                }))
            })
            .catch(err => {
                this.setState(prevState => ({
                    err: true,
                    city: prevState.value
                }))
            })
    }

    render() {
        return (
            <div className="app">
                <Form
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handlerCitySubmit}
                />
                <Result weather={this.state}/>
            </div>
        );
    }
}

export default App;
