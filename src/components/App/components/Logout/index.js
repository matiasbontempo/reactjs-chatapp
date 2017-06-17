import React from 'react';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';

const Logout = () => {
  firebase.auth().signOut();
  return <Redirect to={"/login"} />
}

export default Logout;