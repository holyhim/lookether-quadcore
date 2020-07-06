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
import { Contentpage } from "./pages/Contentpage"
import './App.css';

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showmain: true,
			isLogin: false,
			userInfo: {
				email: "",
				password: "",
				username: "",
				gender: ""
			},
			weatherInfo : {
				icon:'',
				temp:'',
				feelslike:'',
				min:'',
				max:'',
				rain:''
			},
			dailyInfo: {
				icon:'',
				min:'',
				max:'',
			},
			location:{
				city:""
			}
		};
		this.hiddenMain = this.hiddenMain.bind(this)
		this.showMain = this.showMain.bind(this)
		this.getCurrentWeather = this.getCurrentWeather.bind(this)
	}
	
	showMain(){
		this.setState({
			showmain : true
		})
	}

	hiddenMain(){
		this.setState({
			showmain : false
		})
	}
//var d = new Date(unixtime*1000); dt 변경 
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
						console.log(data)
						this.setState({location:{city: data.localityInfo.administrative[1].name}})
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
		const  main  = this.state.showmain;
		return (
<div className="App">
<BrowserRouter>
	<div id="nav" class="d-flex">
		<Link to="/" id ="home"class="mr-auto p-2" onClick={this.showMain}>LookEther</Link>
		<Link to="/signin" type="button" class="P2 btn btn-light btn-lg" onClick={this.hiddenMain}>Sign in</Link>
	</div>
	<div class="d-flex justify-content-center"><Toggle city={this.state.location.city}/></div>
	{main ? 
		<div class="d-flex justify-content-center"><Contentpage /></div>
		:<div class="d-flex justify-content-center"><Link to="/signin"></Link></div>
	}
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
