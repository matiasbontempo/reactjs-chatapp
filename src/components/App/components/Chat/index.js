import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

import Message from './components/Message';

import './ChatView.css';

class ChatView extends Component {

	constructor() {
		super();
		this.state = {
			messages: []
		}
	}

	componentWillMount() {

		if(!firebase.auth().currentUser) return;

		const firebaseRef = firebase.database().ref("/chats/"+this.props.match.params.chatId+"/messages").limitToLast(50);

		firebaseRef.on("child_added", (snapshot) => {
			const tmpMessages = this.state.messages;
			tmpMessages.push(snapshot.val());
			this.setState({	messages: tmpMessages });
		}, error => console.log(error));

		firebase.database().ref("/users/"+this.props.match.params.friendId).once("value")
			.then((snapshot) => {
				this.props.setHeader({
					title: snapshot.val().displayName,
					img: snapshot.val().photoUrl,
					path: "/contacts",
					overflow: [
						{
							name: "Vaciar Chat",
							path: "/empty"
						},
						{
							name: "Bloquear",
							path: "/block"
						}				
					]
				});
			});
	}

	componentDidUpdate() {
		this.ScrollToBottom();
	}

	ScrollToBottom() {
		var objDiv = document.getElementById("Messages");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	renderMessages() {
		return(
			<div id="Messages" className="Messages">
				{this.state.messages.map((message, i) => (<Message key={i} self={this.props.match.params.friendId !== message.owner} content={message.content} time={message.time}></Message>))}
			</div>
		);
	}

	render() {
		return(
			<div className="ChatView">
				{this.renderMessages()}
				<form onSubmit={this.handleMessageSubmit.bind(this)} className="Input">
					<input type="text" placeholder="Escribe un mensaje..." ref="message"/>
					<button><img src={"/img/ic_action_send.png"} alt=""/></button>
				</form>
			</div>
		);
	}

	handleMessageSubmit(e) {
		e.preventDefault();
		if(!this.refs.message.value) return;

		const newMessage = {
			owner: firebase.auth().currentUser.uid,
			content: this.refs.message.value,
			time: Date.now()
		}

		this.setState({ messages: [...this.state.messages, newMessage]});
		firebase.database().ref("/chats/"+this.props.match.params.chatId+"/messages").push(newMessage);
		this.refs.message.value = "";
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

export default connect(null, mapDispatchToProps)(ChatView);