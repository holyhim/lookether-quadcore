import React from "react";

/*
props = {
  weatherInfo:{
		date: "",
    icon: "",
		temp: "",
		feelslike: "",
		min: "",
		max: "",
		rain: "",
  }
}
*/

const Currentweather = (props) => {
	return !props.weather ? (
		<div>Loading</div>
	) : (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">Currentweather</h5>
				<img
					id="weather-icon"
					src={`http://openweathermap.org/img/wn/${props.weather.icon}.png`}
					alt=""
				></img>
				<div>현재 기온: {props.weather.temp}</div>
				<div>체감 온도: {props.weather.feelslike}</div>
				<div>최고 기온: {props.weather.max}</div>
				<div>최저 기온: {props.weather.min}</div>
			</div>
		</div>
	);
};

export { Currentweather };
