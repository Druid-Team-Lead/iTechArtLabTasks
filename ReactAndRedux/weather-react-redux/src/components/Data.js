import React from 'react';

export class Data extends React.PureComponent {

  componentDidMount() {
    this.props.loadData(this.props.isForecast, this.props.city);
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