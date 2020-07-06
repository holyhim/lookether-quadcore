import React from "react"

/*
props = {
  key={uniqid(`${data.weather[0].id}-`)}
  weather_id={data.weather[0].id}
  max={data.temp.max}
  min={data.temp.min}
  icon={data.weather.icon}
}
*/

const Weekweather = (props) => (
	<div>
		<img
			src={`http://openweathermap.org/img/wn/${props.icon}.png`}
			alt=""
		></img>
		<div>최고 기온: {props.max}</div>
		<div>최저 기온: {props.min}</div>
	</div>
)
export { Weekweather }
