import React from "react"

import DefaultImg from "./DefaultImg"
import { male } from "../../public/defaultClothes/male"

import "./Weekweather.css"

/*
props = {
  key={uniqid(`${data.weather[0].id}-`)}
  weather_id={data.weather[0].id}
  max={data.temp.max}
  min={data.temp.min}
  icon={data.weather.icon}
}
*/

const Weekweather = (props) => {
	let defaultClothes = {
		shirts: "",
		pants: "",
	}
	if (props.weather >= 17) {
		defaultClothes.shirts = male.shortShirts
		defaultClothes.pants = male.shortPants
	} else if (17 > props.weather && props.weather >= 10) {
		defaultClothes.shirts = male.longShirts
		defaultClothes.pants = male.pants
	} else if (10 >= props.weather && props.weather !== "") {
		defaultClothes.shirts = male.jacket
		defaultClothes.pants = male.pants
	}
return(		
	<div id="week" className="card">
		<div className="card-body">
			<img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt=""/>
			<div>최고 기온: {props.max}</div>
			<div>최저 기온: {props.min}</div>
		</div>
	</div>
)}

export default Weekweather 
