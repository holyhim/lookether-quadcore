import React from "react"
import { Link, Route, BrowserRouter, Switch, Router } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY"
import { getWeatherData, reverseGeo } from "../getWeatherData"
import { Toggle } from "./pages/Toggle"
import { Currentweather } from "./pages/Currentweather"
import { Mypage } from "./pages/Mypage"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Todayclothes } from "./pages/Todayclothes"
import { Weekweather } from "./pages/Weekweather"
import { Contentpage } from "./pages/Contentpage"
import { male } from "../public/defaultClothes/male"
import "./App.css"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showmain: true,
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
		}
		this.hiddenMain = this.hiddenMain.bind(this)
		this.showMain = this.showMain.bind(this)
		this.getCurrentWeather = this.getCurrentWeather.bind(this)
	}

	showMain() {
		this.setState({
			showmain: true,
		})
	}

	hiddenMain() {
		this.setState({
			showmain: false,
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
						this.setState({
							currentWeatherInfo: {
								date: new Date(data.current.dt * 1000),
								icon: data.current.weather[0].icon,
								temp: data.current.temp,
								feelslike: data.current.feels_like,
								min: data.daily[0].temp.min,
								max: data.daily[0].temp.max,
							},
							dailyWeatherInfo: data.daily.slice(1),
						})
					}
				)
				reverseGeo(
					{
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					(data) => {
						this.setState({
							location: { city: data.principalSubdivision },
						})
					}
				)
			})
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.")
		}
	}

	componentDidMount() {
		this.getCurrentWeather()
	}

	render() {
		// const { isLogin , userInfo } = this.state;
		const { isLogin } = this.state
		const main = this.state.showmain
		return (
			<div className="App">
				<BrowserRouter>
					<div id="nav" class="d-flex">
						<Link to="/" id="home" class="mr-auto p-2" onClick={this.showMain}>
							LookEther
						</Link>
						<Link
							to="/signin"
							type="button"
							class="P2 btn btn-light btn-lg"
							onClick={this.hiddenMain}
						>
							Sign in
						</Link>
					</div>
					<div class="d-flex justify-content-center">
						<Toggle city={this.state.location.city} />
					</div>
					{main ? (
						<div class="d-flex justify-content-center">
							<Contentpage
								weather={this.state.currentWeatherInfo}
								daily={this.state.dailyWeatherInfo}
								userinfo={this.state.userInfo}
							/>
							<img src={male.shortShirts}></img>
						</div>
					) : (
						<div class="d-flex justify-content-center">
							<Link to="/signin"></Link>
						</div>
					)}
					<Switch>
						<Route exact path="/"></Route>
						<Route path="/signin" component={Signin}></Route>
						<Route path="/signup" component={Signup}></Route>
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
