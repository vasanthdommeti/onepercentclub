import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import stockReducer from './reducers/stock';
import navigationReducer from './reducers/navigationStocks';

const rootReducer = combineReducers({
    auth: authReducer,
    stocks: stockReducer,
    navigationDetails : navigationReducer
});

const store = createStore(rootReducer);

export default store;
