import React from 'react';
import DataContainer from './DataContainer'

export class Weather extends React.PureComponent {

  onCityChange = (e) => {
    this.props.setCityText(e.target.value);
    this.props.setSubmittedType(false);
  }

  onForecastSelect = (e) => {
    const isForecast = e.target.value === "true" ? true : false;
    this.props.setForecastType(isForecast);
    this.props.setSubmittedType(false);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setSubmittedType(true);
  }

  render() {
    const { city, isForecast, isSubmitted } = this.props;
    return (
      <div className="header_center">
        {isSubmitted && <DataContainer city={city} isForecast={isForecast} />}
        <form onSubmit={this.onSubmit}>
          <div>
            <input placeholder="Enter city..." value={city} onChange={this.onCityChange} />
          </div>
          <div>
            <button onClick={this.onForecastSelect} value="false">Today</button>
            <button onClick={this.onForecastSelect} value="true">Forecast 5 day</button>
          </div>
        </form>
      </div>
    );
  }
}