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
		const dbRef = firebase.database();
		e.preventDefault();
		this.props.startLoading();
		dbRef.ref("/users/").orderByChild("userName").equalTo(this.refs.username.value).once("value")
			.then((snapshot)=>{
				const newFriend = {};
				newFriend[Object.keys(snapshot.val())[0]] = false;
				return dbRef.ref("/friends/"+firebase.auth().currentUser.uid).update(newFriend);
			})
			.then(() => console.log("New friend!"))
			.catch(err => {
				console.log(err);
			});
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

export default connect(null, mapDispatchToProps)(AddContact);