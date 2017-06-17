import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
	render() {
		return(
			<div className={"Message" + (this.props.self ? " self" : "")}>
				<div className="content">
					{this.props.content}
				</div>
				<time>{this.props.time}</time>
			</div>
		);
	}
}