import loggedReducer from './isLoggedIn';

import { combineReducers } from 'redux';

const allReducers = combineReducers ({
    loggedReducer: loggedReducer
})
 
export default allReducers;