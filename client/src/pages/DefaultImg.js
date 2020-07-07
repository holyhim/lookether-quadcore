import React from "react"

const DefaultImg = (props) =>
	!props.default.shirts ? (
		<h1>Loading data</h1>
	) : (
		<div className="default">
			<img className="defaultimg" src={`${props.default.shirts}`} alt=""></img>
			<img className="defaultimg" src={`${props.default.pants}`} alt=""></img>
		</div>
	)

export default DefaultImg
