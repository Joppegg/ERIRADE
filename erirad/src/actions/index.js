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

