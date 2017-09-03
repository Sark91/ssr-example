import ReactDOM from 'react-dom';
import React from 'react';
import App from 'jsx/containers/App';
import stores from 'stores';
import persistStore from 'redux-phoenix';

const persistStoreConfig = {
  whitelist: [
    'posts.all.query._limit',
    'posts.all.pages',
    'albums.all.query._limit',
    'albums.all.pages',
    'todos.all.query._limit',
    'todos.all.pages',
  ],
};

persistStore(stores, persistStoreConfig).then((store) => {
  ReactDOM.render(<App store={store} />, document.getElementById('app'));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('jsx/containers/App', () => {
      const NewApp = require('jsx/containers/App').default; // eslint-disable-line global-require

      ReactDOM.render(<NewApp store={store} />, document.getElementById('app'));
    });
  }
});