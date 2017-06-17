import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import headerReducer from './reducers/headerReducer';
import userReducer from './reducers/userReducer';

export default createStore (
	combineReducers({headerReducer, userReducer}),
	{},
	//applyMiddleware(logger)
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);