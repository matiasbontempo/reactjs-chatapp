import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux'; 

import './Signup.css';

class Signup extends Component {

	constructor() {
		super();
		this.state = {
			error: null
		}
	}

	render() {
		return(
			<section className="Signup">
				<form onSubmit={this.onCreateUser.bind(this)} className="box">
					<h1>Signup</h1>
					<small>{this.state.error}</small>
					<input type="text" placeholder="Email" ref="email"/>
					<input type="password" placeholder="Password" ref="pass1"/>
					<input type="password" placeholder="Repeat Password" ref="pass2"/>
					<button className="pull-right">Ok</button>
				</form>
				<p>Already have an account? <Link to="/login">Login</Link>.</p>
			</section>
		);
	}

	onCreateUser(e) {

		e.preventDefault();

		if (!this.refs.email.value || !this.refs.pass1.value) {
			this.setState({error: "Missing data."});
			return;
		}

		if (this.refs.pass1.value !== this.refs.pass2.value) {
			this.setState({error: "Passwords do not match."});
			return;
		}

		this.setState({error: null});
		this.props.startLoading();

		firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.pass1.value)
			.catch(e => this.setState({error: e.message}));

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		startLoading: () => {
			dispatch({
				type: "START_LOADING"
			});
		}
	}
};

export default connect(null, mapDispatchToProps)(Signup);