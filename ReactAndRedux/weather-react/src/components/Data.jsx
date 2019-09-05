import React from 'react';
import {X_RAPIDAPI_HOST, X_RAPIDAPI_KEY} from '../settings/config'

export class Data extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: this.props.city,
      temperature: null,
      forecast: [],
      isForecast: this.props.isForecast,
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    let url = "https://community-open-weather-map.p.rapidapi.com/";
    if (this.props.isForecast) {
      url += "forecast";
    } else {
      url += "weather";
    }
    fetch(`${url}?q=${this.props.city}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": X_RAPIDAPI_HOST,
        "x-rapidapi-key": X_RAPIDAPI_KEY
      }
    })
      .then(results => results.json())
      .then(data => {
        console.log(data);
        if (data.cod != "404") {
          if (this.props.isForecast) {
            this.setState({
              forecast: data.list.map(item => {
                return {
                  clouds: item.clouds.all,
                  key: item.dt,
                  iconName: item.weather[0].icon,
                  temperature: Math.round(item.main.temp - 273.15),
                  windSpeed: item.wind.speed,
                  date: item.dt_txt,
                  disc: item.weather[0].main
                }
              })
            })
          } else {
            this.setState({
              temperature: Math.round(data.main.temp - 273.15),
              weather: data.weather[0].main,
              isLoaded: true
            });
          }
          this.setState({ isLoaded: true });
        } else {
          this.setState({
            error: "Can't find the city."
          });
        }
      }, 
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { city, temperature, weather, isLoaded, error, forecast, isForecast } = this.state;
    if (error) {
      console.log(error);
      return (
        <p>{error}</p>
      );
    } else {
      if (!isLoaded) {
        return (
          <p>Loading...</p>
        );
      } else {
        return (
          <div>
            {isForecast ? <h1>City: {city}</h1> : <h1>City: {city}, {temperature} C°. {weather}</h1>}
            <section className="forecast">
              {forecast.map(item => (
                <div className="forecast__element" key={item.key}>
                  <div className="forecast__icon">
                    <img src={`http://openweathermap.org/img/wn/${item.iconName}.png`} alt="" />
                  </div>
                  <div className="forecast__border_cup">
                    <p className="forecast__title">{item.disc} - {item.temperature} C°</p>
                    <p className="forecast__description">{item.date}</p>
                    <p className="forecast__description">Wind speed: {item.windSpeed}</p>
                    {item.clouds.all > 0 ?
                      <p className="forecast__description">Number of clouds: {item.clouds}</p> :
                      <p className="forecast__description">No clouds.</p>}
                  </div>
                </div>
              ))}
            </section>
          </div>

        );
      }
    }
  }
}