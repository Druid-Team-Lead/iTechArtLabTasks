import { combineReducers } from 'redux';
import { weatherReducer } from './weather/reducers';
import { dataReducer } from './data/reducers'

export default combineReducers({
    weather: weatherReducer,
    data: dataReducer
});