import React from 'react';
import { Data } from './Data'

export class Weather extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        city: 'Minsk',
        isSubmitted: true,
        isForecast: false,
      };
    }
  
    handleChange = (e) => {
      this.setState({ city: e.target.value, isSubmitted: false, isForecast: e.target.value });
      console.log(this.state.city);
    }
  
    selectForecast = (e) => {
      const isForecast = e.target.value === "true" ? true : false;
      this.setState({ isForecast: isForecast, isSubmitted: false });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({ isSubmitted: true })
    }
  
    render() {
      const city = this.state.city;
      const isForecast = this.state.isForecast;
      return (
        <div className="header_center">
          {this.state.isSubmitted && <Data city={city} isForecast={isForecast} />}
          <form onSubmit={this.handleSubmit}>
            <div>
              <input placeholder="Enter city..." value={city} onChange={this.handleChange} />
            </div>
            <div>
              <button onClick={this.selectForecast} value="false">Today</button>
              <button onClick={this.selectForecast} value="true">Forecast 5 day</button>
            </div>
          </form>
        </div>
      );
    }
  }