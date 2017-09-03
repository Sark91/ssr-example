import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-phoenix';
import createBrowserHistory from 'history/createBrowserHistory';

import clientMiddleware from 'stores/middlewares/clientMiddleware';
import request from 'services/request';

import thunk from 'redux-thunk';

import posts from 'stores/posts/reducer';
import albums from 'stores/albums/reducer';
import todos from 'stores/todos/reducer';

// eslint-disable-next-line no-underscore-dangle
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    routing: routerReducer,
    posts,
    albums,
    todos,
  }),
  reduxCompose(
    applyMiddleware(
      thunk,
      clientMiddleware(request),
      routerMiddleware(history),
    ),
    autoRehydrate,
  ),
);

export default store;

export {
  history,
};