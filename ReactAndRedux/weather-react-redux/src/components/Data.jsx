import React from 'react';
import { X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from '../settings/config'

export class Data extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
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
            /*
            data.list.map(item => {
              this.props.setForecast()
              this.props.setData({
                clouds: item.clouds.all,
                key: item.dt,
                iconName: item.weather[0].icon,
                temperature: Math.round(item.main.temp - 273.15),
                windSpeed: item.wind.speed,
                date: item.dt_txt,
                weather: item.weather[0].main
              })
            })
            */
           console.log('forecast');
          } else {
            this.props.setTemperature(Math.round(data.main.temp - 273.15));
            this.props.setIsLoaded(true);
            this.props.setWeather(data.weather[0].main);
          }
          this.props.setIsLoaded(true);
        } else {
          this.props.setError("Can't find the city.");
        }
      },
      (error) => {
        this.props.setError(error);
        this.props.setIsLoaded(true);
      });
  }

  render() {
    const { city, temperature, weather, isLoaded, error, forecast, isForecast } = this.props;
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
                    <p className="forecast__title">{item.weather} - {item.temperature} C°</p>
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