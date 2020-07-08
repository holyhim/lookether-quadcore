import React from "react";
import { Currentweather } from "./Currentweather";
import Todayclothes from "./Todayclothes";
import { Weekweather } from "./Weekweather";
import axios from "axios";
import "./Contentpage.css";

const uniqid = require("uniqid");

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

class Contentpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null,
		};
		this.handleImgInput.bind(this);
	}

	handleImgInput(e) {
		this.setState({
			img: e.target.files[0],
		});
	}

	handleImgUpload() {
		const formData = new FormData();
		formData.append("file", this.state.img);
		return axios
			.post("http://localhost:4000/upload", formData)
			.then((res) => {
				alert(res.status);
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		return (
			<div>
				<div class="row">
					<div class="cur-weather">
						<Currentweather weather={this.props.weather} />
					</div>
					<div class="row">
					<Todayclothes weather={this.props.weather.temp} />
						{/* <input
							type="file"
							name="file"
							onChange={(e) => {
								this.handleImgInput(e);
							}}
						></input>
						<button onClick={this.handleImgUpload.bind(this)}>UPLOAD</button> */}
					</div>
				</div>
					<div>
						{this.props.daily.map((data) => (
							<div  class="weekweather">
								<Weekweather
								key={uniqid(`${data.weather[0].id}-`)}
								weather_id={data.weather[0].id}
								max={data.temp.max}
								min={data.temp.min}
								icon={data.weather[0].icon}
							/>
							</div>
						))}
				</div>
			</div>
		);
	}
}
export default Contentpage;
