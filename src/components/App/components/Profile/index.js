import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

import './Profile.css';

class Profile extends Component {

	constructor() {
		super();
		this.defaultName = "";
		this.state = {
			profileImgURL: "/img/profile_default.jpg",
			profileImg: "",
			displayName: ""
		}
	}

	componentWillMount() {
		this.props.setHeader({
			title: "Ajustes",
			path: "/contacts"
		});
		const defaultName = typeof this.props.user.displayName === "string" ? this.props.user.displayName : "";
		const defaultImg = typeof this.props.user.photoUrl === "string" ? this.props.user.photoUrl : this.state.profileImgURL;
		this.setState({displayName: defaultName, profileImgURL: defaultImg});
	}

	render() {
		return(
			<form onSubmit={this.handleUpdateProfile.bind(this)} className="Profile box">
				<h1>Edit your profile</h1>
				<div className="ProfileImg">
					<div className="ImageContainer" style={{backgroundImage: 'url(' + this.state.profileImgURL + ')',}}></div>
					<label htmlFor="newProfileImg"><img src="/img/ic_action_edit.png" alt="Edit"/></label>
					<input onChange={this.handleNewImage.bind(this)} id="newProfileImg" type="file" accept="image/*" ref="ImgInput"/>
				</div>
				<input onChange={this.handleChangeName.bind(this)} type="text" placeholder="Display Name" value={this.state.displayName} ref="displayName"/>
				<button className="pull-right">Save</button>
			</form>
		);
	}

	handleNewImage(event) {
		this.setState({profileImg: event.target.files[0], profileImgURL: URL.createObjectURL(event.target.files[0])});
	}

	handleChangeName(event) {
		this.setState({displayName: event.target.value});
	}

	handleUpdateProfile(event) {
		event.preventDefault();

		const toUpdate = {}
		const file = this.state.profileImg;

		if (this.defaultName != this.state.displayName) toUpdate.displayName = this.state.displayName;

		if (!file) {
			this.updateProfile(toUpdate);
			return
		}

		const storageRef = firebase.storage().ref(`/profiles/${this.props.user.email}`);
		const task = storageRef.put(file);

		task.on('state_changed', snapshot => {}, err => {
			console.log(err.message)
		}, () => {
			toUpdate.photoUrl = task.snapshot.downloadURL;
			this.updateProfile(toUpdate)
		});

	}

	updateProfile(userData) {
		firebase.database().ref('users/' + this.props.user.uid).set(userData)
			.then(() => this.props.setUserName(userData));
	}

}

const mapStateToProps = state => { return { user: state.userReducer }};

const mapDispatchToProps = dispatch => {
	return {
		setHeader: (header) => {
			dispatch({
				type: "SET_HEADER",
				payload: header
			});
		},
		setUserName: (name) => {
			dispatch({
				type: "SET_USERNAME",
				payload: name
			});
		},
		setImage: (name) => {
			dispatch({
				type: "SET_USERNAME",
				payload: name
			});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);