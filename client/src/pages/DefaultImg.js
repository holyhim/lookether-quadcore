import React from "react"
import "./DefaultImg.css"

const DefaultImg = (props) =>
	!props.default.shirts ? (
		<h1>Loading data</h1>
	) : (
		<div className="default">
			<img className="defaultimg" src={`${props.default.etc}`} alt=""/>
			<img className="defaultimg" src={`${props.default.shirts}`} alt=""/>
			<img className="defaultimg" src={`${props.default.pants}`} alt=""/>
		</div>
	)

export default DefaultImg
