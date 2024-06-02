const initialState = {
    navigationStock : []
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NAVIGATION_STOCK':
            console.log("action", action);
            return { ...state, navigationStock : action.payload };
        default:
            return state;
    }
};

export default navigationReducer;
