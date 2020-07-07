import React from "react"
import { Currentweather } from "./Currentweather"
import Todayclothes from "./Todayclothes"
import { Weekweather } from "./Weekweather"
import "./Contentpage.css"

const uniqid = require("uniqid")

/*
props = {
  weatherInfo:{
    icon: "",
		temp: "",
		feelslike: "",
		min: "",
		max: "",
		rain: "",
  }
}
*/

const Contentpage = (props) => (
	<div>
		<div class="row">
			<div class="cur-weather">
				<Currentweather weather={props.weather} />
			</div>
			<div class="clothe">
				<Todayclothes weather={props.weather.temp} />
			</div>
		</div>
		<div class="row">
			<div class="weekweather">
				{props.daily.map((data) => (
					<Weekweather
						key={uniqid(`${data.weather[0].id}-`)}
						weather_id={data.weather[0].id}
						max={data.temp.max}
						min={data.temp.min}
						icon={data.weather[0].icon}
					/>
				))}
			</div>
		</div>
	</div>
)

export { Contentpage }