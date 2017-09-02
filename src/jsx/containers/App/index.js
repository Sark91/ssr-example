import React from 'react';
import stores, { history } from 'stores';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import './style.scss';

export default () => (
  <div className="app">
    <Provider store={stores}>
      <ConnectedRouter history={history}>
        <div>
          Helloł
        </div>
      </ConnectedRouter>
    </Provider>
  </div>
);
