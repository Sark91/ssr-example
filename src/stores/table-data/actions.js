import {
  TABLE_DATA_GET_DATA,
  TABLE_DATA_GET_DATA_SUCCESS,
  TABLE_DATA_GET_DATA_ERROR,

  TABLE_DATA_SET_LIMIT,
  TABLE_DATA_SET_PAGE,
} from 'stores/table-data/actionTypes';

const getData = (reducer, prop) => (dispatch, getState) => {
  const data = getState()[reducer][prop];

  return dispatch({
    types: [TABLE_DATA_GET_DATA, TABLE_DATA_GET_DATA_SUCCESS, TABLE_DATA_GET_DATA_ERROR],
    payload: { reducer, prop },
    promise: client => client.get(data.endpoint, { query: data.query }),
  });
};

const refreshData = (reducer, prop) => () => dispatch => dispatch(getData(reducer, prop));

const setLimit = (reducer, prop) => _limit => (dispatch) => {
  dispatch({
    type: TABLE_DATA_SET_LIMIT,
    payload: { reducer, prop, _limit },
  });

  return dispatch(getData(reducer, prop));
};

const setPage = (reducer, prop) => _page => (dispatch) => {
  dispatch({
    type: TABLE_DATA_SET_PAGE,
    payload: { reducer, prop, _page },
  });

  return dispatch(getData(reducer, prop));
};

export {
  getData,
  refreshData,
  setLimit,
  setPage,
};