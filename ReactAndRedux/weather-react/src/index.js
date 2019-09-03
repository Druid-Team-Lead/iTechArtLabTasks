import React from 'react';
import ReactDOM from 'react-dom';


function CallApi(props) {
  
}
class Data extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: this.props.city,
      temp: null,
      weather: [],
      wind: null
    };
  }

  componentDidMount() {
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${this.props.city}`, {
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "89fd4dcec1msh380ae180876442cp1622c7jsn1e9eaa994091"
      }
    })
    .then(results => results.json())
    .then(data => {
      this.setState({
        temp: data.main.temp,
        weather: data.weather,
        wind: data.wind.speed
      });
      console.log(data);
    })
    .catch(err => console.log(err));
  }

  render() {
    const { city, temp, weather, wind } = this.state;
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

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      city: 'Minsk',
      isSubmitted: false
    };
  }

  handleChange(e) {
    this.setState({ city: e.target.value, isSubmitted: false  });
    console.log(this.state.city);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isSubmitted: true })
  }

  render() {
    const city = this.state.city;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Enter city..."
            value={city}
            onChange={this.handleChange} />
          <input type="submit" value="Search"/>
        </form>
        {this.state.isSubmitted && <Data city={city}/>}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('root')
);