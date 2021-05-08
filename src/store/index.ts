import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import currentReducer from './reducers/current.reducer';
import forecastReducer from './reducers/forecast.reducer';

const reducers = combineReducers({
    current: currentReducer,
    forecast: forecastReducer
});

export default createStore(
    reducers,
    applyMiddleware(thunk)
);