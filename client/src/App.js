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
		this.getCurrentPosition();
		getWeatherData(
			{ lat: this.state.position.lat, lon: this.state.position.lon , key: WEATHER_API_KEY },
			(weatherData) => {
				console.log('hi',weatherData);
			}
		);
	}

	
	componentDidMount() {
		this.getCurrentPosition();
		setTimeout(() => {
			this.getCurrentWeather();
		}, 3000);
	}



	render() {
		return <div>
				hello
		</div>;
	}
}

export default App;
