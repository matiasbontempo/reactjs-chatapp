import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './ActionBar.css';

export default class ActionBar extends Component {

	renderBackButton() {
		if (!this.props.header.path) return;
		return (<Link className="ActionBack" to={this.props.header.path}><img src={"/img/ic_action_back.png"} alt=""/></Link>);
	}

	renderActionButtons() {
		if (!this.props.header.overflow) return;
		return (
			<li className="ActionButton">
				<img src={"/img/ic_action_overflow.png"} alt=""/>
				<ul className="ActionOverflow">
					{ this.props.header.overflow.map((item) => <li key={item.path}><Link to={item.path}>{item.name}</Link></li>) }
				</ul>
			</li>
		);
	}

	render() {
		return(
			<div className="ActionBar">
				{this.renderBackButton()}	
				<div className="AppIcon">
					{(this.props.header.img ? <img src={this.props.header.img} alt=""/> : "")}
				</div>
				<span className="AppTitle">
					{ this.props.header.title }
				</span>
				<ul className="ActionButtons">
					{this.renderActionButtons()}
				</ul>
			</div>
		);
	}
}