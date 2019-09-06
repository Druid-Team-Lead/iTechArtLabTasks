import React from 'react';
import callApi from '../middleware/api'

export class Data extends React.PureComponent {

  componentDidMount() {
    let endpoint = this.props.isForecast ? "forecast" : "weather";
    callApi(endpoint, this.props.city).then(data => {
      if (data.cod !== "404") {
        if (this.props.isForecast) {
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
          this.props.setForecast(forecast);
          this.props.setError(null);
        } else {
          this.props.setTemperature(Math.round(data.main.temp - 273.15));
          this.props.setWeather(data.weather[0].main);
          this.props.setError(null);
        }
      } else {
        this.props.setError(data.message);
      }
      this.props.setIsLoaded(true);
    },
      (error) => {
        this.props.setError(error.message);
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
            {isForecast &&
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
                      {item.clouds > 0 ?
                        <p className="forecast__description">Number of clouds: {item.clouds}</p> :
                        <p className="forecast__description">No clouds.</p>}
                    </div>
                  </div>
                ))}
              </section>}
          </div>
        );
      }
    }
  }
}