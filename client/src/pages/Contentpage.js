import React from "react";
import Currentweather  from "./Currentweather";
import Todayclothes from "./Todayclothes";
import Weekweather  from "./Weekweather";
import axios from "axios";
import $ from "jquery";
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
		this.ocShowAlert.bind(this);
	}

	handleImgInput(e) {
		this.setState({
			img: e.target.files[0],
		});
	}

	handleImgUpload = () => {
		const data = new FormData();
		// If file selected
		if (this.state.img) {
			data.append("file", this.state.img, this.state.img.name);
			axios
				.post("http://localhost:4000/upload", data, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
					},
				})
				.then((response) => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ("LIMIT_FILE_SIZE" === response.data.error.code) {
								this.ocShowAlert("Max size: 2MB", "red");
							} else {
								console.log(response.data);
								// If not the given file type
								this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;
							console.log("fileName", fileName);
							this.ocShowAlert("File Uploaded", "#3089cf");
						}
					}
				})
				.catch((error) => {
					// If another error
					this.ocShowAlert(error, "red");
				});
		} else {
			// if file not selected throw error
			this.ocShowAlert("Please upload file", "red");
		}
	};
	// ShowAlert Function
	ocShowAlert = (message, background = "#3089cf") => {
		let alertContainer = document.querySelector("#oc-alert-container"),
			alertEl = document.createElement("div"),
			textNode = document.createTextNode(message);
		alertEl.setAttribute("class", "oc-alert-pop-up");
		$(alertEl).css("background", background);
		alertEl.appendChild(textNode);
		alertContainer.appendChild(alertEl);
		setTimeout(function () {
			$(alertEl).fadeOut("slow");
			$(alertEl).remove();
		}, 3000);
	};

	render() {
		return (
			<div>
				<div className="d-flex justify-content-center">
					<div className="cur-weather">
						<Currentweather weather={this.props.weather} />
					</div>
					<div className="card">
						<div className="card-body">
						<div className="upload-btn-wrapper">
						<button onClick={this.handleImgUpload.bind(this)} className="btn">UPLOAD</button>
						<input id="fileupload"
							type="file"
							name="file"
							onChange={(e) => {
								this.handleImgInput(e);
							}}/>
						<div><Todayclothes weather={this.props.weather.temp} /></div>
					</div>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center">
						{this.props.daily.map((data) => (
							<div className="daily ">
							<Weekweather
								key={uniqid(`${data.weather[0].id}-`)}
								weather_id={data.weather[0].id}
								weather={this.props.weather.temp}
								max={data.temp.max}
								min={data.temp.min}
								icon={data.weather[0].icon}/>
							</div>
						))}
					</div>
			</div>
		);
	}
}
export default Contentpage;