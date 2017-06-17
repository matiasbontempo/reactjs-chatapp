import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';

import './Login.css';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			error: null
		}
	}

	componentWillMount() {
		this.props.setHeader({
			title: "ChatApp"
		});
	}

	render() {
		return(
			<section className="Login">
				<form onSubmit={this.onLoginUser.bind(this)} className="box">
					<h1>Login</h1>
					<small>{this.state.error}</small>
					<input type="text" placeholder="Email" ref="email" />
					<input type="password" placeholder="Password" ref="pass" />
					<button className="pull-right">Login</button>
				</form>
				<p>Don't have an account? <Link to="/signup">Signup here</Link>.</p>
			</section>
		);
	}

	onLoginUser(e) {

		e.preventDefault();

		if (!this.refs.email.value || !this.refs.pass.value) {
			this.setState({error: "Missing data."});
			return;
		}

		this.setState({error: null});

		firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.pass.value)
			.catch(e => this.setState({error: e.message}));
	}


}

const mapDispatchToProps = (dispatch) => {
	return {
		setHeader: (header) => {
			dispatch({
				type: "SET_HEADER",
				payload: header
			});
		}
	}
};

export default connect(null, mapDispatchToProps)(Login);