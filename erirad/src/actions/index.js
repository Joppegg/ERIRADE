export const signIn = () => {
    return {
        type: 'SIGN_IN'
    };
};

export const signInEmployee = employee => {
    return {
        type: 'EMPLOYEE',
        payload: employee
    };
};

export const setReport = report => {
    return{
        type: 'SET_REPORT',
        payload: report
    }
}

export const setRequest = reportRequest => {
    return{
        type: 'SET_REQUEST',
        payload: reportRequest
    }
}
