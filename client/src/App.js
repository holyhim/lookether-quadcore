import React from "react"
import { Link, Route, Switch, Redirect, Router } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY"
import { getWeatherData, reverseGeo } from "../getWeatherData"
import { Toggle } from "./pages/Toggle"
import { Mypage } from "./pages/Mypage"
import Signin  from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Contentpage } from "./pages/Contentpage"
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
		this.handdleUserInfo = this.handdleUserInfo.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin = () => {
		this.setState({ isLogin: !this.state.isLogin })
	};

	handdleUserInfo(user){
		this.setState({
			userInfo : user
		})
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

	componentWillMount() {
		this.getCurrentWeather()
	}

	render() {
		// const { isLogin , userInfo } = this.state;
		const { isLogin } = this.state
		const main = this.state.showmain
		return (
			// title, location, signin, id=nav
			// contentpage
			// weekly
			// if it clicks signin, nav exists, signin box appears instead of contentpage
			// if it successes signin, contentpage appears back
			// if it doesn't have id, signup page appears
			// if it's done signup, signin page appears back
			<div>
				<div id="nav">
					<div>
						<Link to="/">LookEther</Link>
					</div>
					<div>
						<Toggle city={this.state.location.city} />
					</div>
					<div>
						<Link to="./signin">Signin</Link>
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
							)
						}}
					/>
					<Route path="/signin" render ={()=>{return <Signin isLogin={isLogin} userInfo={this.state.userInfo} handdleUserInfo = {this.handdleUserInfo} handleLogin={this.handleLogin}/>}} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</div>
		)
	}
}

export default App
