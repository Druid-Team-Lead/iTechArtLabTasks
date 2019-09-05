import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Weather } from './components/Weather';
import TestComponent from './components/TestComponent';
import { rootReducer } from './store/reducers'
import './style.css';
import logo from './img/logo.gif';

const store = createStore(rootReducer);

class Application extends React.Component {
  render() {
    return (
      <div className="white-card white-card_wrap">
        <div className="header header_center">
          <header className="wrap">
            <img src={logo} alt="" />
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
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);