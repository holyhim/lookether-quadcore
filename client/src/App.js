import React from "react";

import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY";
import { getWeatherData, reverseGeo } from "../getWeatherData";
// import { Toggle } from "./pages/Toggle"
// import { Currentweather } from "./pages/Currentweather"
// import { Mypage } from "./pages/Mypage"
// import { Signin } from "./pages/Signin"
// import { Signup } from "./pages/Signup"
// import { Todaycloth } from "./pages/Todaycloth"
// import { Weekweather } from "./pages/Weekweather"

class App extends React.Component {
	state = {
		isLogin: false,
		userInfo: {
			email: "",
			password: "",
			username: "",
			gender: "",
		},
		weatherInfo: {},
	};

	getCurrentData = () => {
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
						console.log(data.countryName);
						console.log(data.principalSubdivision);
					}
				);
			});
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
		}
	};

	componentDidMount() {
		this.getCurrentData();
	}

	render() {
		// const { isLogin , userInfo } = this.state;
		return (
			// <div>
			// 	<Toggle/>
			// 	<div>
			// 		<Signin />
			// 		<Signup/>
			// 	</div>
			// 	<Currentweather/>
			// 	<Weekweather/>
			// 	<Todaycloth/>
			// 	<Mypage/>
			// </div>
			<div></div>
		);
	}
}

export default App;
