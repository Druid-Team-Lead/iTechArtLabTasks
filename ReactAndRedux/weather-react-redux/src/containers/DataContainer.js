import React from 'react';
import { connect } from 'react-redux';
import { Data } from '../components/Data';
import { loadData } from '../actions/data'

class DataContainer extends React.PureComponent {
    render() {
        const { city, temperature, forecast, weather, isForecast, isLoaded, error, loadData } = this.props;
        return (
            <Data
                city={city}
                temperature={temperature}
                forecast={forecast}
                isForecast={isForecast}
                isLoaded={isLoaded}
                error={error}
                weather={weather}
                loadData={loadData}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        temperature: state.data.temperature,
        forecast: state.data.forecast,
        isLoaded: state.data.isLoaded,
        error: state.data.error,
        weather: state.data.weather
    };
};

const mapDispatchToProps = {
    loadData
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);