import loggedReducer from './isLoggedIn';
import employeeReducer from './EmployeeLoggedIn';
import { combineReducers } from 'redux';

const allReducers = combineReducers ({
    loggedReducer: loggedReducer,
    employee: employeeReducer
})
 
export default allReducers;