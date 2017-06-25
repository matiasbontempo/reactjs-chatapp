import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

import ContactMessage from './components/ContactMessage';
import AddContact from './components/AddContact';

import './Contacts.css';

class Contacts extends Component {

	constructor() {
		super();
		this.state = {
			friends: []
		}
	}

	componentWillMount() {

		this.props.setHeader({
			title: "ChatApp",
			overflow: [
				{
					name: "Editar perfil",
					path: "/profile"
				},
				{
					name: "Salir",
					path: "/logout"
				}				
			]
		});
		
		this.firebaseRef = firebase.database().ref("/lastMessages/"+this.props.user.uid);

		this.firebaseRef.on("child_added", (snapshot) => {
			const tmpFriends = this.state.friends;
			tmpFriends[snapshot.key] = {...snapshot.val()}
			tmpFriends.sort((a,b) => a.time > b.time);
			this.setState({	friends: tmpFriends	});
		}, error => console.log(error));

		this.firebaseRef.on("child_changed", (snapshot) => {
			const tmpFriends = this.state.friends;
			tmpFriends[snapshot.key] = {...snapshot.val()}
			tmpFriends.sort((a,b) => a.time > b.time);
			this.setState({	friends: tmpFriends	});
		}, error => console.log(error));

	}

	componentWillUnmount() {
		this.firebaseRef.off();
	}

	renderContacts() {
		return (
			<div>
				{Object.keys(this.state.friends).map((chatId) => (<ContactMessage key={chatId} chatId={chatId} friendInfo={this.state.friends[chatId]}></ContactMessage>))}
			</div>
		);
	}

	render() {
		return(
			<section className="Contacts">
				{this.renderContacts()}
				<AddContact></AddContact>
			</section>
		);
	}
}

const mapStateToProps = state => { return { user: state.userReducer }};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeader: (header) => {
			dispatch({
				type: "SET_HEADER",
				payload: header
			});
		},
		setLoading: (isLoading) => {
			dispatch({
				type: "SET_LOADING",
				payload: isLoading
			});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);