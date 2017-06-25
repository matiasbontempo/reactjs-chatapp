import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import './AddContact.css';

class AddContact extends Component {

	constructor() {
		super();
		this.state = {
			showModal: false
		}
	}

	renderModal() {
		if (!this.state.showModal) return;
		return(
			<div className="overlay dark">
				<form onSubmit={this.handleFindSubmit.bind(this)} className="box modal">
					<h2>Find contact</h2>
					<input type="text" placeholder="Username" ref="username" />
					<button className="pull-right">Find</button>
				</form>
			</div>
		);
	}

	render() {
		return(
			<div className="AddContact">
				<button onClick={this.handleAddClick.bind(this)}><img src="/img/ic_action_user.png" alt=""/></button>
				{this.renderModal()}
			</div>
		);
	}

	handleAddClick() {
		this.setState({ showModal: !this.state.showModal });
	}

	handleFindSubmit(e) {

		if (!this.refs.username.value) return;

		const dbRef = firebase.database();
		e.preventDefault();

		this.props.setLoading(true);
		
		dbRef.ref("/users/").orderByChild("userName").equalTo(this.refs.username.value).once("value")
			.then((snapshot)=>{
				const newFriend = {};
				newFriend[Object.keys(snapshot.val())[0]] = false;
				return dbRef.ref("/friends/"+firebase.auth().currentUser.uid).update(newFriend);
				
			})
			.then(() => this.handleAddClick())
			.catch(err => {
				console.log(err);
			})
			.then(() => this.props.setLoading(false));
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (isLoading) => {
			dispatch({
				type: "set_LOADING",
				payload: isLoading
			});
		}
	}
};

export default connect(null, mapDispatchToProps)(AddContact);