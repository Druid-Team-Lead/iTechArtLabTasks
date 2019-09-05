export const WEATHER_CHANGE_CITY_TEXT = 'WEATHER_CHANGE_CITY_TEXT';
export const WEATHER_SELECT_FORECAST_TYPE = 'WEATHER_SELECT_FORECAST_TYPE';
export const WEATHER_CHANGE_SUBMITTED_TYPE = 'WEATHER_CHANGE_SUBMITTED_TYPE';

export const setCityText = (city) => ({
    type: WEATHER_CHANGE_CITY_TEXT,
    payload: city
})

export const setForecastType = (isForecast) => ({
    type: WEATHER_SELECT_FORECAST_TYPE,
    payload: isForecast
})

export const setSubmittedType = (isSubmitted) => ({
    type: WEATHER_CHANGE_SUBMITTED_TYPE,
    payload: isSubmitted
})