import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers'

import WeatherContainer from './components/WeatherContainer';

import './style.css';
import logo from './img/logo.gif';

const store = createStore(rootReducer);

function Application() {
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

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);