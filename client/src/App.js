import React from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import dotenv from "dotenv";
import path from "path";
import "bootstrap/dist/css/bootstrap.css";
import { getWeatherData, reverseGeo } from "../getWeatherData";
import { Toggle } from "./pages/Toggle";
import Signin from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Contentpage from "./pages/Contentpage";
import {Signout} from "./pages/Signout"
import axios from "axios";

// import { WEATHER_API_KEY } from "../config/config";
import "./App.css";

// const WEATHER_API_KEY = process.env.REACT_APP_WHEATHER_API_KEY;

dotenv.config({ path: path.join(__dirname, "path/to/.env") });

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			userInfo: {
				email: "",
				password: "",
				username: "",
				gender: "",
			},
			currentWeatherInfo: {
				date: "",
				icon: "",
				temp: "",
				feelslike: "",
				min: "",
				max: "",
				rain: "",
			},
			dailyWeatherInfo: [],
			location: {
				city: "",
			},
		};
		this.getCurrentWeather = this.getCurrentWeather.bind(this);
		this.handdleUserInfo = this.handdleUserInfo.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}




	handleLogin = () => {
		this.setState({ isLogin: true });
	};

	handleLogout = () => {
		this.setState({ isLogin: false });
		localStorage.clear()
		return(
			<Redirect path="*" to="/"/>
		)
	};

	handdleUserInfo(user) {
		this.setState({
			userInfo: user,
		});
	}

	hiddenMain() {
		this.setState({
			showmain: false,
		});
	}
	//var d = new Date(unixtime*1000); dt 변경
	getCurrentWeather = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				getWeatherData(
					{
						lat: position.coords.latitude,
						lon: position.coords.longitude,
						key: process.env.REACT_APP_WEATHER_API_KEY,
					},
					(data) => {
						this.setState({
							currentWeatherInfo: {
								date: new Date(data.current.dt * 1000),
								icon: data.current.weather[0].icon,
								temp: data.current.temp,
								feelslike: data.current.feels_like,
								min: data.daily[0].temp.min,
								max: data.daily[0].temp.max,
							},
							dailyWeatherInfo: data.daily.slice(1,6),
						});
					}
				);
				reverseGeo(
					{
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					(data) => {
						this.setState({
							location: { city: data.principalSubdivision },
						});
					}
				);
			});
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
		}
	};
	

	componentDidMount() {
		this.getCurrentWeather();
		let id = localStorage.getItem('userInfo')
		if(id){
			this.handleLogin()
		}else{
			this.handleLogout()
		}
	}

	render() {
		// const { isLogin , userInfo } = this.state;
		const { isLogin } = this.state;
		return (
			// title, location, signin, id=nav
			// contentpage
			// weekly
			// if it clicks signin, nav exists, signin box appears instead of contentpage
			// if it successes signin, contentpage appears back
			// if it doesn't have id, signup page appears
			// if it's done signup, signin page appears back
			
			<div>
				<div id="nav" className="d-flex justify-content-between">
						<Link to="/" className="h3">LookEther</Link>
						<Toggle city={this.state.location.city} />
						<div>

								{isLogin ? (
								<div>
								<div type="button" className="P2 btn btn-light btn-lg">Mypage</div>,
								<div type="button" className="P2 btn btn-light btn-lg" onClick ={this.handleLogout}>Signout</div>
								</div>)
								: <Link to ="/signin" type="button" className="P2 btn btn-light btn-lg">Signin</Link>}
						</div>
				</div>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<div>
									<div>
										<Contentpage
											weather={this.state.currentWeatherInfo}
											daily={this.state.dailyWeatherInfo}
											userinfo={this.state.userInfo}
										/>
									</div>
								</div>
							);
						}}
					/>
					<Route
						path="/signin"
						render={() => {
							return (
								<Signin
									isLogin={isLogin}
									userInfo={this.state.userInfo}
									handdleUserInfo={this.handdleUserInfo}
									handleLogin={this.handleLogin}
								/>
							);
						}}
					/>
					<Route path="/signup" component={Signup} />
					<Redirect path="*" to="/"/>
				</Switch>
			</div>
		);
	}
}

export default App;
