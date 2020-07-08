import React from "react"
import "./Currentweather.css"
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
	return (
		<div id="cardbox" class="card" >
			<div class="card-body">
				<div class="row">
				<img
					id="weather-icon"
					src={`http://openweathermap.org/img/wn/${props.weather.icon}.png`}
					alt=""/>
				<div id="cur" class="col">{props.weather.temp}℃</div>
				</div>
				<div class="row">
				<div class="col">최고 온도 {props.weather.max}℃</div>
				<div class="col">최저 온도 {props.weather.min}℃</div>
				</div>
				<div class="row">
				<div class="col">강수량  {props.weather.rain}0mm</div>
				<div class="col">체감 온도 {props.weather.feelslike}℃</div>
				</div>
			</div>
		</div>
	)
}

export { Currentweather }