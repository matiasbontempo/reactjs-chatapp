import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ContactMessage.css';

export default class ContactMessage extends Component {

	UnreadMessages() {
		return this.props.message.unread ? <span>{this.props.message.unread}</span> : "";
	}

	render() {
		return(
			<Link to={"/chat/" + this.props.user.name}>
				<div className="ContactMessage">
					<div className="img">
						<img src={this.props.user.img} alt={this.props.user.name}/>
					</div>
					<div className="Content">
						<strong>{this.props.user.name}</strong>
						<p>{this.props.message.content}</p>
					</div>
					<div className="Info" data-unread={this.props.message.unread}>
						<time>{this.props.message.time}</time>
						{this.UnreadMessages()}
					</div>
				</div>
			</Link>
		);
	}
}