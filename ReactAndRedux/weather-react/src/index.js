import React from 'react';
import ReactDOM from 'react-dom';
import { Data } from './components/data'
import './style.css';
import logo from './img/logo.gif';

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.state = {
      city: 'Minsk',
      isSubmitted: true,
      isForecast: false,
    };
  }

  handleChange(e) {
    this.setState({ city: e.target.value, isSubmitted: false, isForecast: e.target.value });
    console.log(this.state.city);
  }

  selectChange(e) {
    this.setState({ isForecast: e.target.value, isSubmitted: false });
  }

  handleSubmit(e) {
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
            <button onClick={this.selectChange} value="false">Today</button>
            <button onClick={this.selectChange} value="true">Forecast 5 day</button>
          </div>
        </form>
      </div>
    );
  }
}

class Application extends React.Component {
  render() {
    return (
      <div className="white-card white-card_wrap">
        <div className="header header_center">
          <header className="wrap">
            <img src={logo} alt=""/>
          </header>
        </div>
        <main className="wrap">
          <Weather />
        </main>
      </div>
    );
  }
}
ReactDOM.render(
  <Application />,
  document.getElementById('root')
);