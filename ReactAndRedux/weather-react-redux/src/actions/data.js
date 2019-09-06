import callApi from '../api'

export const CHANGE_TEMPERATURE = 'CHANGE_TEMPERATURE';
export const CHANGE_FORECAST = 'CHANGE_FORECAST';
export const CHANGE_IS_LOADED = 'CHANGE_IS_LOADED';
export const CHANGE_ERROR = 'CHANGE_ERROR';
export const CHANGE_WEATHER = 'CHANGE_WEATHER';

export const loadData = (isForecast, city) => (dispatch) => {
    
    let endpoint = isForecast ? "forecast" : "weather";
    callApi(endpoint, city).then(data => {
        if (data.cod !== "404") {
            if (isForecast) {
                const forecast = data.list.map(item => {
                    return {
                        clouds: item.clouds.all,
                        key: item.dt,
                        iconName: item.weather[0].icon,
                        temperature: Math.round(item.main.temp - 273.15),
                        windSpeed: item.wind.speed,
                        date: item.dt_txt,
                        weather: item.weather[0].main
                    }
                });
                
                dispatch(setForecast(forecast));
                dispatch(setError(null));
            } else {
                dispatch(setTemperature(Math.round(data.main.temp - 273.15)));
                dispatch(setWeather(data.weather[0].main));
                dispatch(setError(null));
            }
        } else {
            dispatch(setError(data.message));
        }
        dispatch(setIsLoaded(true));
    },
    (error) => {
        dispatch(setError(error.message));
        dispatch(setIsLoaded(true));
    });
}

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