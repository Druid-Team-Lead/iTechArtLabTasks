import React from 'react';
import ReactDOM from 'react-dom';

class Data extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: null,
      temp: null,
      weather: [],
      wind: null
    };
  }

  componentDidMount() {
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Minsk", {
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "89fd4dcec1msh380ae180876442cp1622c7jsn1e9eaa994091"
      }
    })
      .then(results => results.json())
      .then(data => {
        this.setState({
          city: data.name,
          temp: data.main.temp,
          weather: data.weather,
          wind: data.wind.speed
        });
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      city,
      temp,
      weather, wind } = this.state;
    return (
      <div>
        <div>
          <h1>City: {city}, {temp - 273.15} C°</h1>
          <p>Weather:</p>
          <ul>
            {weather.map(item => (
              <li key={item.id}>
                {item.main} - {item.description}
              </li>
            ))}
          </ul>
          <p>Wind: {wind}</p>
        </div>
      </div>
    );
  }
}

class CallApi extends React.Component {

  render() {
    return (
      <div>
        <Data />
      </div>
    );
  }
}

class Weather extends React.Component {
  render() {
    return (
      <div>
        <CallApi />
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('root')
);