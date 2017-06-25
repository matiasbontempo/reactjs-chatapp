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
			displayName: "",
			userName: "",
			userNameErr: false,
			userNameDisabled: ""
		}
	}

	componentWillMount() {
		console.log(this.props.user);
		this.props.setHeader({
			title: "Ajustes",
			path: "/contacts"
		});
		const defaultDisplayName = typeof this.props.user.displayName === "string" ? this.props.user.displayName : "";
		const defaultUserName = typeof this.props.user.userName === "string" ? this.props.user.userName : "";
		const userNameDisabled = typeof this.props.user.userName === "string" ? "true" : "";
		const defaultImg = typeof this.props.user.photoUrl === "string" ? this.props.user.photoUrl : this.state.profileImgURL;
		this.setState({displayName: defaultDisplayName, userName: defaultUserName, userNameDisabled: userNameDisabled, profileImgURL: defaultImg});
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
			<input onChange={this.handleChangeUserName.bind(this)} type="text" placeholder="User Name (You can't change this)" value={this.state.userName} ref="userName" className={(this.state.userNameErr ? "error" : "")} disabled={this.state.userNameDisabled} />
			<input onChange={this.handleChangeDisplayName.bind(this)} type="text" placeholder="Display Name" value={this.state.displayName} ref="displayName"/>
			<button className="pull-right">Save</button>
			</form>
			);
	}

	handleNewImage(event) {
		this.setState({profileImg: event.target.files[0], profileImgURL: URL.createObjectURL(event.target.files[0])});
	}

	handleChangeUserName(event) {
		const txt = event.target.value;
		this.setState({userNameErr: false});
		if (txt.indexOf(" ") >= 0) this.setState({userNameErr: true});
		this.setState({userName: txt});
	}

	handleChangeDisplayName(event) {
		this.setState({displayName: event.target.value});
	}

	handleUpdateProfile(event) {

		event.preventDefault();
		if (this.state.userNameErr || this.state.userName.length === 0) return;

		const toUpdate = {}
		const file = this.state.profileImg;

		if (this.defaultName !== this.state.displayName) toUpdate.displayName = this.state.displayName;
		if (!this.userNameDisabled) toUpdate.userName = this.state.userName;

		this.props.startLoading();

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
		firebase.database().ref('users/' + this.props.user.uid).update(userData)
		.then(() => {
			this.props.endLoading();
		});
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
		},
		startLoading: () => {
			dispatch({ type: "START_LOADING" });
		},
		endLoading: () => {
			dispatch({ type: "END_LOADING" });
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);