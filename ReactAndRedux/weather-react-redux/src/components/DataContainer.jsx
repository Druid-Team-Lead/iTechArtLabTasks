import React from 'react';
import { connect } from 'react-redux';
import { Data } from './Data';
import { setTemperature, setError, setForecast, setIsLoaded, setWeather } from '../store/data/actions'

class DataContainer extends React.PureComponent {
    render() {
        const { city, temperature, forecast, isForecast, isLoaded, error, setTemperature, setError, setForecast, setIsLoaded, setWeather } = this.props;
        return (
            <Data
                city={city}
                temperature={temperature}
                forecast={forecast}
                isForecast={isForecast}
                isLoaded={isLoaded}
                error={error}
                setTemperature={setTemperature}
                setError={setError}
                setIsLoaded={setIsLoaded}
                setForecast={setForecast}
                setWeather={setWeather}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        city: state.weather.city,
        temperature: state.data.isSubmitted,
        forecast: state.data.isForecast,
        isForecast: state.weather.isForecast,
        isLoaded: state.data.isLoaded,
        error: state.data.error
    };
};

const mapDispatchToProps = {
    setTemperature,
    setError,
    setIsLoaded,
    setForecast,
    setWeather,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);