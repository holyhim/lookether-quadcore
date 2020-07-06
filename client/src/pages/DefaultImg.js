import React from "react"

const DefaultImg = (props) => {
	return (
		<div>
			<img src={`${props.defaultClothes.shirts}`} alt=""></img>
			<img src={`${props.defaultClothes.pants}`} alt=""></img>
		</div>
	)
}

export default DefaultImg
