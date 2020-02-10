const employeeReducer =
    (state = {
        employeeId: '',
        firstName: '',
        lastName: ''
    }, action) => {
        switch (action.type) {
            case 'EMPLOYEE':
                return action.payload;
            default:
                return state;
        }
    }

export default employeeReducer; 