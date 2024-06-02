const initialState = {
    stocks: [],
    orders: [],
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STOCKS':
            return { ...state, stocks: action.payload };
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.payload] };
        case 'REMOVE_ORDER':
            return { ...state, orders: []};
        default:
            return state;
    }
};

export default stockReducer;
