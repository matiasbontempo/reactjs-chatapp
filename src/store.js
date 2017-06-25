import {createStore, combineReducers} from 'redux';
//import logger from 'redux-logger';

import globalReducer from './reducers/globalReducer';
import userReducer from './reducers/userReducer';

export default createStore (
	combineReducers({globalReducer, userReducer}),
	{},
	//applyMiddleware(logger)
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);