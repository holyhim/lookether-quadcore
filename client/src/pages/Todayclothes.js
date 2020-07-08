import React from "react"
import DefaultImg from "./DefaultImg"
import { male } from "../../public/defaultClothes/male"

import "./Todayclothes.css"

// import { female } from "../public/defaultClothes/female"

/*
props = {
  weather:{
    icon: "",
		temp: "",
		feelslike: "",
		min: "",
		max: "",
		rain: "",
  }
}
*/

const Todayclothes = (props) => {
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
	return (
				<div id="cloth-icon" >
				<DefaultImg default={defaultClothes} />
				</div>
	)
}

export default Todayclothes
