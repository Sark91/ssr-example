import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

ReactDOM.render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default; // eslint-disable-line global-require

    ReactDOM.render(<NewApp />, document.getElementById('app'));
  });
}