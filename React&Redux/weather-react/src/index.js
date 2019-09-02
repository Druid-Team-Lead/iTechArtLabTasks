import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      city: null
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
        temp: data.main.temp,
        city: data.name
      });
    })
    .catch(err => console.log(err));
  }
      
  render() {
    const {temp, city} = this.state;
    return <h1>Город: {city}, температура {temp-273.15} градусов</h1>
  }
}


ReactDOM.render(<MyComponent />, document.getElementById('root'));