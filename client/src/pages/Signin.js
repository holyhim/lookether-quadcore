import React from "react"
import {
	Link,
	Route,
	withRouter,
	Redirect,
	BrowserRouter,
} from "react-router-dom"
import axios from "axios"
import "./Signin.css"

class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "",
		}
		this.handleInputValue = this.handleInputValue.bind(this)
	}
	handleInputValue = (key) => (e) => {
		this.setState({ [key]: e.target.value })
	}
	render() {
		if (this.props.isLogin) {
			return <Redirect to="/" />
		} 
		return (
			<div class="login-page">
				<div class="form">
					<form
						class="login-form"
						onSubmit={(e) => {
							e.preventDefault()
							axios
								.post("http://localhost:4000/signin", this.state)
								.then((res) => {
									if(res.status===200){
										this.props.handdleUserInfo(res.data)
										this.props.handleLogin();
									}
								})
								.catch((err) => {
									if (err)
										alert("이메일과 비밀번호가 잘못되었습니다")
								})
						}}
					>
						<input type="text" placeholder="Email"  onChange={this.handleInputValue('email')} />
						<input type="password" placeholder="password"onChange={this.handleInputValue('password')} />
						<button type="submit">login</button>
						<div class="message">
							Not registered? <Link to="./signup">Create an account</Link>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(Signin) 
