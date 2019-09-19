import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Books';

class FetchData extends Component {
  componentWillMount() {
    this.props.requestWeatherForecasts();
  }

  render() {
    return (
      <div>
        <h1>Books</h1>
        {renderForecastsTable(this.props)}
      </div>
    );
  }
}

function renderForecastsTable(props) {
    console.log(props);
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {props.forecasts.map(forecast =>
          <tr key={forecast.id}>
            <td>{forecast.id}</td>
            <td>{forecast.title}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
