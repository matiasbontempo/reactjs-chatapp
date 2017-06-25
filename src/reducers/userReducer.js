const userReducer = (state = {uid: 0}, action) => {
	switch (action.type) {
		case "LOGIN_USER":
			state = {...state, ...action.payload};
			localStorage.setItem("user", JSON.stringify(state));
			break;
		case "LOGOUT_USER":
			state = {uid: 0};
			localStorage.removeItem("user");
			break;
		case "SET_USERNAME":
			state = {...state, displayName: action.payload};
			break;
		case "ADD_CONTACT":
			break;
		default:
			state = {...state};
			break;
	}
	return state;
};

export default userReducer;