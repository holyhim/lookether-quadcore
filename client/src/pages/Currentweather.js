import React from "react";
import "./Currentweather.css"

const Currentweather = (props) => {
	return !props.weather ? (
		<div>Loading</div>
	) : (
		<div className="card">
			<div className="card-body">
				<div className="row">
					<img
						id="weather-icon"
						src={`http://openweathermap.org/img/wn/${props.weather.icon}.png`}
						alt=""/>
					<div id="cur" className="col">{props.weather.temp}℃</div>
				</div>
				<div className="row">
					<div className="col">최고 기온 {props.weather.max}℃</div>
					<div className="col">최저 기온 {props.weather.min}℃</div>
				</div>
				<div className="row">
					<div className="col">강수량  {props.weather.rain}0mm</div>
					<div className="col">체감 기온 {props.weather.feelslike}℃</div>
				</div>
			</div>
		</div>
	);
};

export default Currentweather;