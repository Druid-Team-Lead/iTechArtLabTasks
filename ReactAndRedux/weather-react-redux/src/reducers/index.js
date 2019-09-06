import { combineReducers } from 'redux';
import { weatherReducer } from '../reducers/weatherReducer';
import { dataReducer } from '../reducers/dataReducer'

export default combineReducers({
    weather: weatherReducer,
    data: dataReducer
});