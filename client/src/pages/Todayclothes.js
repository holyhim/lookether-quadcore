import React from "react"
import DefaultImg from "./DefaultImg"
import {clothesAll}  from "../../public/defaultClothes/clothesAll"
import "./Todayclothes.css"

const Todayclothes = (props) => {
	let defaultClothes = {
		shirts: "",
		pants: "",
	}
	if (props.weather >= 22) {
		defaultClothes.etc = clothesAll.summerhat
		defaultClothes.shirts = clothesAll.shortShirts
		defaultClothes.pants = clothesAll.shortPants
	} else if (22 > props.weather && props.weather >=17) {
		defaultClothes.shortShirts = clothesAll.shortShirts
		defaultClothes.pants = clothesAll.pants
	} else if (17>= props.weather && props.weather >=12) {
		defaultClothes.etc = clothesAll.cardigan
		defaultClothes.shirts = clothesAll.longShirts
		defaultClothes.pants = clothesAll.pants
	} else if (12>= props.weather && props.weather >=9) {
		defaultClothes.etc = clothesAll.jacket
		defaultClothes.shirts = clothesAll.hoodie
		defaultClothes.pants = clothesAll.pants
	} else if (9 >= props.weather && props.weather !== "") {
		defaultClothes.etc = clothesAll.wintrtjacket
		defaultClothes.shirts = clothesAll.hoodie
		defaultClothes.pants = clothesAll.pants
	}
	return (
				<div id="cloth-icon" >
				<DefaultImg default={defaultClothes} />
				</div>
	)
}

export default Todayclothes
