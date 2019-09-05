import React from 'react';

export class Data extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: this.props.city,
      temp: null,
      weather: [],
      wind: null,
      forecast: [],
      isForecast: this.props.isForecast,
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    let url = "https://community-open-weather-map.p.rapidapi.com/";
    if (this.props.isForecast === "true") {
      url += "forecast";
    } else {
      url += "weather";
    }
    fetch(`${url}?q=${this.props.city}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "89fd4dcec1msh380ae180876442cp1622c7jsn1e9eaa994091"
      }
    })
      .then(results => results.json())
      .then(data => {
        console.log(data);
        if (data.cod != "404") {
          if (this.props.isForecast === "true") {
            this.setState({
              forecast: data.list,
            })
          } else {
            this.setState({
              temp: data.main.temp,
              weather: data.weather,
              wind: data.wind.speed,
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
    const { city, temp, weather, wind, isLoaded, error, forecast, isForecast } = this.state;
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
            {isForecast == "true" ? <h1>City: {city}</h1> : <h1>City: {city}, {Math.round(temp - 273.15)} C°</h1>}
            <section className="employees">
              {forecast.map(item => (
                <div className="employees__element" key={item.dt}>
                  <div className="employees__photo">
                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
                  </div>
                  <div className="employees__border_cup">
                    <p className="employees__name">{item.weather[0].main} - {Math.round(item.main.temp - 273.15)} C°</p>
                    <p className="employees__description">{item.dt_txt}</p>
                    <p className="employees__description">Wind speed: {item.wind.speed}</p>
                    {item.clouds.all > 0 ?
                      <p className="employees__description">Number of clouds: {item.clouds.all}</p> :
                      <p className="employees__description">No clouds.</p>}
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