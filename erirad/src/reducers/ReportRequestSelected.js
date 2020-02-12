const reportReducer =
    (state = {
        reportId: '',
        title: '',
        description: ''
    }, action) => {
        switch (action.type) {
            case 'SET_REPORT':
                return action.payload;
            default:
                return state;
        }
    }

export default reportReducer; 