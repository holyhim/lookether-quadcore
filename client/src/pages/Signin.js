import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
		this.handleInputValue = this.handleInputValue.bind(this);
	}
	handleInputValue = (key) => (e) => {
		this.setState({ [key]: e.target.value });
	};
	render() {
		if (this.props.isLogin) {
			return <Redirect to="/" />;
		}
		return (
			<div className="login-page">
				<div className="form">
					<form
						className="login-form"
						onSubmit={(e) => {
							e.preventDefault();
							axios
								.post("http://localhost:4000/signin", this.state)
								.then((res) => {
									if (res.status === 200) {
										console.log(res)
										this.props.handdleUserInfo(res);
										this.props.handleLogin();
										localStorage.setItem(
											"userInfo",
											JSON.stringify({
												userInfo : this.props.userInfo,
												token: this.props.userInfo.token
											}))
									} else {
										alert("로그인 정보를 확인 해 주세요");
									}
								})
								.catch((err) => {
									console.log(err);
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
							placeholder="password"
							onChange={this.handleInputValue("password")}
						/>
						<button type="submit">login</button>
						<div className="message">
							Not registered? <Link to="./signup">Create an account</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(Signin);
