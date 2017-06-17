const headerReducer = (state = { title: "ChatApp" }, action) => {
	switch (action.type) {
		case "SET_HEADER":
			state = {...action.payload};
			break;
		default:
			state = {...state}
	}
	return state;
};
export default headerReducer;