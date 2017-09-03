import {
  TABLE_DATA_GET_DATA,
  TABLE_DATA_GET_DATA_SUCCESS,
  TABLE_DATA_GET_DATA_ERROR,

  TABLE_DATA_SET_LIMIT,
  TABLE_DATA_SET_PAGE,
} from 'stores/table-data/actionTypes';

const getData = (store, prop) => (dispatch, getState) => {
  const data = getState()[store][prop];

  return dispatch({
    types: [TABLE_DATA_GET_DATA, TABLE_DATA_GET_DATA_SUCCESS, TABLE_DATA_GET_DATA_ERROR],
    payload: { store, prop },
    promise: client => client.get(data.endpoint, { query: data.query }),
  });
};

const refreshData = (store, prop) => () => dispatch => dispatch(getData(store, prop));

const setLimit = (store, prop) => _limit => (dispatch) => {
  dispatch({
    type: TABLE_DATA_SET_LIMIT,
    payload: { _limit },
  });

  return dispatch(getData(store, prop));
};

const setPage = (store, prop) => _page => (dispatch) => {
  dispatch({
    type: TABLE_DATA_SET_PAGE,
    payload: { _page },
  });

  return dispatch(getData(store, prop));
};

export {
  getData,
  refreshData,
  setLimit,
  setPage,
};