import { combineReducers } from 'redux';
import { weatherReducer } from './weather';
import { dataReducer } from './data'

export default combineReducers({
    weather: weatherReducer,
    data: dataReducer
});