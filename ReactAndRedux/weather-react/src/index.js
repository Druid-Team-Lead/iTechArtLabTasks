import React from 'react';
import ReactDOM from 'react-dom';
import { Weather } from './components/Weather'
import './style.css';
import logo from './img/logo.gif';

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