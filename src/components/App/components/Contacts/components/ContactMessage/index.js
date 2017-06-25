import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ContactMessage.css';

export default class ContactMessage extends Component {

	UnreadMessages() {
		return this.props.friendInfo.unread ? <span>{this.props.friendInfo.unread}</span> : "";
	}

	render() {
		return(
			<Link to={"/chat/" + this.props.chatId + "/" + this.props.friendInfo.friendId}>
				<div className="ContactMessage">
					<div className="img">
						<img src={this.props.friendInfo.photoUrl} alt={this.props.friendInfo.displayName}/>
					</div>
					<div className="Content">
						<strong>{this.props.friendInfo.displayName}</strong>
						<p>{this.props.friendInfo.content}</p>
					</div>
					<div className="Info" data-unread={this.props.friendInfo.unread}>
						<time>{this.props.friendInfo.time}</time>
						{this.UnreadMessages()}
					</div>
				</div>
			</Link>
		);
	}
}