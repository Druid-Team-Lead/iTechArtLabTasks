import React from 'react';
import { connect } from 'react-redux';
import { Weather } from '../components/Weather';
import { setCityText, setForecastType, setSubmittedType } from '../actions/weather'

class WeatherContainer extends React.PureComponent {
    render() {
        const { setCityText, setForecastType, setSubmittedType, city, isSubmitted, isForecast } = this.props;
        return (
            <Weather
                setCityText={setCityText}
                setForecastType={setForecastType}
                setSubmittedType={setSubmittedType}
                city={city}
                isSubmitted={isSubmitted}
                isForecast={isForecast}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        city: state.weather.city,
        isSubmitted: state.weather.isSubmitted,
        isForecast: state.weather.isForecast
    };
};

const mapDispatchToProps = {
    setCityText,
    setForecastType,
    setSubmittedType,
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);