const reportRequestInputReducer =
    (state = {
        requestId: '',
        title: '',
        description: '',
        authorId: ''

    }, action) => {
        switch (action.type) {
            case 'SET_REQUEST':
                return action.payload;
            default:
                return state;
        }
    }

export default reportRequestInputReducer; 