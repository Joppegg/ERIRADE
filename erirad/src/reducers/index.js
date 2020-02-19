import loggedReducer from './isLoggedIn';
import employeeReducer from './EmployeeLoggedIn';
import { combineReducers } from 'redux';
import reportReducer from './ReportRequestSelected';
import reportRequestInputReducer from './ReportRequestInput'

const allReducers = combineReducers ({
    loggedReducer: loggedReducer,
    employee: employeeReducer,
    reportSelected: reportReducer,
    requestSelected: reportRequestInputReducer
})
 
export default allReducers;