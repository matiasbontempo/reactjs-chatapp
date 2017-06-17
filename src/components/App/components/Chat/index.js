import React, { Component } from 'react';
import {connect} from 'react-redux';

import Message from './components/Message';

import './ChatView.css';

class ChatView extends Component {

	componentWillMount() {
		this.props.setHeader({
			title: "Matias",
			img: "https://trello-avatars.s3.amazonaws.com/a201e2f221ba7c7cc70361d019a5a1d1/30.png",
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
	}

	componentDidMount() {
		this.ScrollToBottom();
	}

	ScrollToBottom() {
		var objDiv = document.getElementById("Messages");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	render() {
		return(
			<div className="ChatView">
				<div id="Messages" className="Messages">
					Chat with: {this.props.match.params.name}
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
					<Message self={true} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sed, dolorem quae! "} time={Date.now()}></Message>
				</div>
				<form className="Input">
					<input type="text" placeholder="Escribe un mensaje..."/>
					<button><img src={"/img/ic_action_send.png"} alt=""/></button>
				</form>
			</div>
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

export default connect(null, mapDispatchToProps)(ChatView);