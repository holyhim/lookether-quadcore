import React from 'react';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import "./Signin.css"

class Signin extends React.Component {
    render() {
        return (
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>login</button>
                <div class="message">Not registered? <Link to="/signup">Create an account</Link></div>
            </form>
        </div>
    </div>
        );
    }
}

export {Signin}
