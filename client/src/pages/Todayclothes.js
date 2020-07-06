import React from "react"
import DefaultImg from "./DefaultImg"
import { male } from "../../public/defaultClothes/male"
// import { female } from "../public/defaultClothes/female"

class Todayclothes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultImg: {
				shirts: "",
				pants: "",
			},
		}
	}

	todayClothesHandler() {
		if (this.state.userInfo.gender === male) {
			if (this.state.currentWeatherInfo.temp >= 25) {
				this.setState({
					defaultImg: {
						shirts: male.shortShirts,
						pants: male.shortPants,
					},
				})
			}
		}
	}

	render() {
		return (
			<div>
				<DefaultImg defaultImg={this.state.defaultImg.shirts}></DefaultImg>
			</div>
		)
	}
}

export default Todayclothes
