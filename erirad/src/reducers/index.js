import loggedReducer from './isLoggedIn';
import employeeReducer from './EmployeeLoggedIn';
import { combineReducers } from 'redux';
import reportReducer from './ReportRequestSelected';

const allReducers = combineReducers ({
    loggedReducer: loggedReducer,
    employee: employeeReducer,
    reportSelected: reportReducer
})
 
export default allReducers;