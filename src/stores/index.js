import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import clientMiddleware from 'stores/middlewares/clientMiddleware';
import request from 'services/request';

// eslint-disable-next-line no-underscore-dangle
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

export default createStore(
  combineReducers({
    routing: routerReducer,
  }),
  reduxCompose(
    applyMiddleware(
      clientMiddleware(request),
      routerMiddleware(history),
    ),
  ),
);

export {
  history,
};