const userReducer = (state = {uid: 0}, action) => {
	switch (action.type) {
		case "LOGIN_USER":
			state = {...state, ...action.payload};
			break;
		case "LOGOUT_USER":
			state = {uid: 0};
			break;
		case "SET_USERNAME":
			state = {...state, displayName: action.payload};
		default:
			state = {...state};
			break
	}
	return state;
};

export default userReducer;