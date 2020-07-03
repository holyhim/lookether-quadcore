import React from "react";
import {  Link, Route, BrowserRouter, Switch, Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'
import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY";
import { getWeatherData , reverseGeo } from "../getWeatherData";
import { Toggle } from "./pages/Toggle"
import { Currentweather } from "./pages/Currentweather"
import { Mypage } from "./pages/Mypage"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Todaycloth } from "./pages/Todaycloth"
import { Weekweather } from "./pages/Weekweather"
import './App.css';

class App extends React.Component {
	state = {
		isLogin: false,
		userInfo: {
			email: "",
			password: "",
			username: "",
			gender: ""
		},
		weatherInfo : {
			
		},
		location:{
			city:"",
		}

	};

	getCurrentWeather = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				getWeatherData(
					{
						lat: position.coords.latitude,
						lon: position.coords.longitude,
						key: WEATHER_API_KEY,
					},
					(data) => {
						console.log(data);
					}
				);
				reverseGeo(
					{
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					(data) => {
						console.log(data);
					}
				)
			});
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
		}
	}

	componentDidMount() {
		this.getCurrentWeather();
	}

	render() {
		// const { isLogin , userInfo } = this.state;
		const { isLogin } = this.state;
		return (
<div className="App">
<BrowserRouter>
	<div id="nav" class="d-flex">
		<Link to="/" id ="home"class="mr-auto p-2">LookEther</Link>
		<Link to="/signin" button type="button" class="P2 btn btn-light btn-lg">Sign in</Link>
	</div>
	<div class="d-flex justify-content-center"><Toggle  /></div>
	<div class="row justify-content-md-center">
	<div class="row">
    <div class="cur-weather"><Currentweather /></div>
    <div class="cloth"><Todaycloth /></div>
    </div>
	</div>
	<Switch>
		<Route exact path="/" ></Route>
		<Route path="/signin" component ={Signin}></Route>
		<Route path="/signup" component ={Signup}></Route>
	</Switch>
</BrowserRouter>
</div>
		)
	}
}

export default App;
