export const CHANGE_TEMPERATURE= 'CHANGE_TEMPERATURE';
export const CHANGE_FORECAST = 'CHANGE_FORECAST';
export const CHANGE_IS_LOADED = 'CHANGE_IS_LOADED';
export const CHANGE_ERROR = 'CHANGE_ERROR';
export const CHANGE_WEATHER = 'CHANGE_WEATHER';

export const setTemperature = (temperature) => ({
    type: CHANGE_TEMPERATURE,
    payload: temperature
});

export const setForecast = (forecast) => ({
    type: CHANGE_FORECAST,
    payload: forecast
});

export const setIsLoaded = (isLoaded) => ({
    type: CHANGE_IS_LOADED,
    payload: isLoaded
});

export const setError = (error) => ({
    type: CHANGE_ERROR,
    payload: error
});

export const setWeather = (weather) => ({
    type: CHANGE_WEATHER,
    payload: weather
});