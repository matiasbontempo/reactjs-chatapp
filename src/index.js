import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './store';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// Keep user information in local storage to avoid firebase first async request.
if (localStorage.getItem("user")) store.dispatch({
	type: "LOGIN_USER",
	payload: JSON.parse(localStorage.getItem("user"))
});

// Initialize Firebase
firebase.initializeApp({
	apiKey: "AIzaSyAIAgkHF3qddVBVxpxt1R0N0ntqSR3jV-c",
	authDomain: "chatapp-4c029.firebaseapp.com",
	databaseURL: "https://chatapp-4c029.firebaseio.com",
	projectId: "chatapp-4c029",
	storageBucket: "chatapp-4c029.appspot.com",
	messagingSenderId: "618415483811"
});

// On Firebase Auth change, login or logout user.
firebase.auth().onAuthStateChanged(firebaseUser => {
	store.dispatch({type: "END_LOADING"});
	if (firebaseUser) {
		const ref = firebase.database().ref('users/'+firebaseUser.uid);
		ref.on('value', snapshot => {
			const user = snapshot.val();
			store.dispatch({
				type: "LOGIN_USER",
				payload: {uid: firebaseUser.uid, email: firebaseUser.email, ...user}
			});
		});
	} else {
		store.dispatch({
			type: "LOGOUT_USER"
		});
	}
});

ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	document.getElementById('root')
);
registerServiceWorker();