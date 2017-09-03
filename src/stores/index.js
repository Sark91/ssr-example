import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import clientMiddleware from 'stores/middlewares/clientMiddleware';
import request from 'services/request';

import thunk from 'redux-thunk';

import posts from 'stores/posts/reducer';
import albums from 'stores/albums/reducer';

// eslint-disable-next-line no-underscore-dangle
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

export default createStore(
  combineReducers({
    routing: routerReducer,
    posts,
    albums,
  }),
  reduxCompose(
    applyMiddleware(
      thunk,
      clientMiddleware(request),
      routerMiddleware(history),
    ),
  ),
);

export {
  history,
};