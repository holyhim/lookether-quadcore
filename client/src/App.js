import React from "react";

import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY";
import { getWeatherData } from "../getWeatherData";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: "",
			userInfo: {},
		};
	}
	// 화씨 => 섭씨 변환 공식
	// C = (F - 32)/1.8
	getCurrentWeather() {
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
			});
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
		}
	}

	componentDidMount() {
		this.getCurrentWeather();
	}

	render() {
		return <div className="App"></div>;
	}
}

export default App;
