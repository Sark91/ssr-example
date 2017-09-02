import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

// eslint-disable-next-line no-underscore-dangle
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

export default createStore(
  combineReducers({
    routing: routerReducer,
  }),
  reduxCompose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);

export {
  history,
};