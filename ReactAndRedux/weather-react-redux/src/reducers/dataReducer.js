import { CHANGE_TEMPERATURE, CHANGE_ERROR, CHANGE_FORECAST, CHANGE_IS_LOADED, CHANGE_WEATHER } from '../actions/dataActions';

const defaultState = {
    city: 'Minsk',
    temperature: null,
    forecast: [],
    weather: null,
    isForecast: false,
    isLoaded: false,
    error: null
};

export const dataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_TEMPERATURE:
            return { ...state, temperature: action.payload }
        case CHANGE_FORECAST:
            return { ...state, forecast: action.payload }
        case CHANGE_WEATHER:
            return { ...state, weather: action.payload }
        case CHANGE_IS_LOADED:
            return { ...state, isLoaded: action.payload }
        case CHANGE_ERROR:
            return { ...state, error: action.payload }
        default: return state;
    }
};