import React, { Component } from 'react';
import {connect} from 'react-redux';

import ContactMessage from './components/ContactMessage';

import './Contacts.css';

class Contacts extends Component {

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
	}

	render() {
		return(
			<section className="Contacts">
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
			</section>
		);
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

export default connect(null, mapDispatchToProps)(Contacts);