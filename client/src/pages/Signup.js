import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			username: "",
			gender: "",
		};
		this.handleInputValue = this.handleInputValue.bind(this);
	}
	handleInputValue = (key) => (e) => {
		this.setState({ [key]: e.target.value });
	};
	render() {
		return (
			<div className="login-page">
				<div className="form">
					<form
						className="login-form"
						onSubmit={(e) => {
							e.preventDefault();
							axios
								.post("http://localhost:4000/signup", this.state)
								.then((res) => {
									alert(`${res.data.username}님 회원가입 완료되었습니다!`);
									this.props.history.push("/signin");
								})
								.catch((error) => {
									console.log(error);
								});
						}}
					>
						<input
							type="text"
							placeholder="Email"
							onChange={this.handleInputValue("email")}
						/>
						<input
							type="password"
							placeholder="Password"
							onChange={this.handleInputValue("password")}
						/>
						<input
							type="text"
							placeholder="User Name"
							onChange={this.handleInputValue("username")}
						/>
						<input
							type="text"
							placeholder="Gender"
							onChange={this.handleInputValue("gender")}
						/>
						<button type="submit">
							<Link to="/signin">sign up</Link>
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export { Signup };
