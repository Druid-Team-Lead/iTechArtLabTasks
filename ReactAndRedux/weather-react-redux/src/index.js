import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers/index'

import WeatherContainer from './containers/WeatherContainer';

import './style.css';
import logo from './img/logo.gif';


const store = createStore(rootReducer, devToolsEnhancer());

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