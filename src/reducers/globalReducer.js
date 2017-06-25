const globalReducer = (state = { isLoading: true, header: { title: "ChatApp" } }, action) => {
	switch (action.type) {
		case "SET_HEADER":
			state = {...state, header: {...action.payload} };
			break;
		case "START_LOADING":
			state = {...state, isLoading: true };
			break;
		case "END_LOADING":
			state = {...state, isLoading: false };
			break;
		case "SET_LOADING":
			state = {...state, isLoading: action.payload };
			break;
		default:
			state = {...state}
	}
	return state;
};
export default globalReducer;