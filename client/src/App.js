import React from "react";

import { WEATHER_API_KEY } from "../weatherAPI_KEY/WeatherAPI_KEY";
import { getWeatherData , reverseGeo } from "../getWeatherData";
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
			gender: ""
		},
		weatherInfo : {
			
		},
		
	};

	componentDidMount() {
		this.getCurrentWeather();
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
		)
	}
}

export default App;
