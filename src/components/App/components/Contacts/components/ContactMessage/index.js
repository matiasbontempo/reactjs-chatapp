import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ContactMessage.css';

export default class ContactMessage extends Component {

	UnreadMessages() {
		return this.props.info.unread ? <span>{this.props.info.unread}</span> : "";
	}

	render() {
		return(
			<Link to={"/chat/" + this.props.info.displayName}>
				<div className="ContactMessage">
					<div className="img">
						<img src={this.props.info.photoUrl} alt={this.props.info.displayName}/>
					</div>
					<div className="Content">
						<strong>{this.props.info.displayName}</strong>
						<p>{this.props.info.content}</p>
					</div>
					<div className="Info" data-unread={this.props.info.unread}>
						<time>{this.props.info.time}</time>
						{this.UnreadMessages()}
					</div>
				</div>
			</Link>
		);
	}
}