import React from 'react';
import WeatherContainer from '../containers/WeatherContainer';
import logo from '../img/logo.gif';

export default function App() {
    return (
      <div className="white-card white-card_wrap">
        <div className="header header_center">
          <header className="wrap">
            <img src={logo} alt=""/>
          </header>
        </div>
        <main className="wrap">
          <WeatherContainer />
        </main>
      </div>
    );
  }