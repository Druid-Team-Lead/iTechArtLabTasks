import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store/configureStore'
import './style.css';
import PropTypes from 'prop-types';

const store = configureStore();



class MyComponent extends React.Component {
  render() {
    // Это должен быть ровно один элемент.
    // Иначе вы увидите предупреждение
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

ReactDOM.render(
  <Provider store={store}>
    <MyComponent children={<div>gi</div>} />
  </Provider>,
  document.getElementById('root')
);
