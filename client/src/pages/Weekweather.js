import React from "react"
import "./Weekweather.css"

const Weekweather = (props) => {
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
