const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
    requestWeatherForecasts: () => async (dispatch, getState) => {

        dispatch({ type: requestWeatherForecastsType });

        const url = `api/Book/GetBooks`;
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({ type: receiveWeatherForecastsType, forecasts });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestWeatherForecastsType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveWeatherForecastsType) {
        return {
            ...state,
            forecasts: action.forecasts,
            isLoading: false
        };
    }

    return state;
};