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
			friends: {}
		}
	}

	componentWillMount() {

		this.props.setLoading(true);

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
			const tmpFriends = {...this.state.friends};
			tmpFriends[snapshot.key] = {...snapshot.val()}
			//tmpFriends.sort((a,b) => a.time > b.time);
			this.setState({	friends: tmpFriends	});
		}, error => console.log(error));

		this.firebaseRef.on("child_changed", (snapshot) => {
			const tmpFriends = {...this.state.friends};
			tmpFriends[snapshot.key] = {...snapshot.val()}
			//tmpFriends.sort((a,b) => a.time > b.time);
			this.setState({	friends: tmpFriends	});
		}, error => console.log(error));

	}

	componentWillUnmount() {
		this.firebaseRef.off();
	}

	renderContacts() {
		return (
			<div>
				{Object.keys(this.state.friends).map((friendId, i) => (<ContactMessage key={friendId} info={this.state.friends[friendId]}></ContactMessage>))}
			</div>
		);
	}

	renderContactsDummy() {
		return(
			<div>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", time: Date.now()}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
				<ContactMessage user={{name: "Matias", img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png"}} message={{content: "Lorem ipsum", time: Date.now(), unread: 3}}></ContactMessage>
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