import { WEATHER_CHANGE_CITY_TEXT, WEATHER_SELECT_FORECAST_TYPE, WEATHER_CHANGE_SUBMITTED_TYPE } from './actions';

const defaultState = {
    city: 'Minsk',
    isForecast: false,
    isSubmitted: true
};

export const weatherReducer = (state = defaultState, action) => {
    switch (action.type) {
        case WEATHER_CHANGE_CITY_TEXT:
            return { ...state, city: action.payload }
        case WEATHER_SELECT_FORECAST_TYPE:
            return { ...state, isForecast: action.payload }
        case WEATHER_CHANGE_SUBMITTED_TYPE:
            return { ...state, isSubmitted: action.payload }
    }

    return state;
};