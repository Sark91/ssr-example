/**
 * Because all fetched data have the same shape i made this common reducer part to not repeat myself
 */

// eslint-disable-next-line import/no-duplicates
import * as tableDataActionTypes from 'stores/table-data/actionTypes';
import {
  TABLE_DATA_GET_DATA,
  TABLE_DATA_GET_DATA_SUCCESS,
  TABLE_DATA_GET_DATA_ERROR,

  TABLE_DATA_SET_LIMIT,
  TABLE_DATA_SET_PAGE,
} from 'stores/table-data/actionTypes'; // eslint-disable-line import/no-duplicates
import immutable from 'object-path-immutable';


/**
 * Create part of state with data used to fetching data
 * @see how its used in 'posts' reducer
 * @param endpoint
 */
const createDataState = ({ endpoint }) => ({
  endpoint,
  query: {
    _page: 1,
    _limit: 12,
  },
  status: 'success', // statuses: fetch, success, error. If endless scrolling append_fetch, append_success, append_error
  error: null,
  data: [],
});

/**
 * @see how its used in 'posts' reducer
 * @param actionTable
 */
const isTableDataActionType = (stateName, action) => {
  if (!action || !action.payload || stateName !== action.payload.reducer) {
    return false;
  }

  return action.type in tableDataActionTypes;
};

/**
 * Reducer part.
 * @see how its used in 'posts' reducer
 * @param state - state given from reducer
 * @param action - action given from reducer
 * @returns {{}} - modified state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case TABLE_DATA_GET_DATA:
      return {
        ...state,
        [action.payload.prop]: {
          ...state[action.payload.prop],
          status: 'fetch',
          data: [],
          error: null,
        },
      };

    case TABLE_DATA_GET_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.prop]: {
          ...state[[action.payload.prop]],
          status: 'success',
          data: action.result,
          error: null,
        },
      };

    case TABLE_DATA_GET_DATA_ERROR:
      return {
        ...state,
        [action.payload.prop]: {
          ...state[[action.payload.prop]],
          status: 'error',
          data: [],
          error: action.error,
        },
      };

    case TABLE_DATA_SET_LIMIT:
      // eslint-disable-next-line no-underscore-dangle
      return immutable.set(state, `${action.payload.prop}.query._limit`, action.payload._limit);

    case TABLE_DATA_SET_PAGE:
      // eslint-disable-next-line no-underscore-dangle
      return immutable.set(state, `${action.payload.prop}.query._page`, action.payload._page);

    default:
      return state;
  }
};

export {
  createDataState,
  isTableDataActionType,
  reducer,
};