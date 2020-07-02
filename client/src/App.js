import React from "react";

import { WEATHER_API_KEY } from "./weatherAPI_KEY/WeatherAPI_KEY";
import { getWeatherData } from "./getWeatherData";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: "",
			userInfo: {},
			position: {
				lat: "",
				lon: "",
			},
		};
	}
	getCurrentPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					position: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
				});
			});
		} else {
			alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
		}
	}

	getCurrentWeather() {
		getWeatherData(
			{ lat: this.lat, lon: this.lon, key: WEATHER_API_KEY },
			(weatherData) => {
				console.log(weatherData);
			}
		);
	}

	componentDidMount() {
		this.getCurrentPosition();
	}

	render() {
		console.log(this.state.position);
		return <div className="App"></div>;
	}
}

export default App;
