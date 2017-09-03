import {
  TABLE_DATA_GET_DATA,
  TABLE_DATA_GET_DATA_SUCCESS,
  TABLE_DATA_GET_DATA_ERROR,

  TABLE_DATA_SET_LIMIT,
  TABLE_DATA_SET_PAGE,
} from 'stores/table-data/actionTypes';

import {
  getData,
  refreshData,
  setLimit,
  setPage,
} from 'stores/table-data/actions';

import mockStore from '../_mockStore';
import { createDataState } from 'stores/table-data/reducer';

describe('table-data actions', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  test('"getData" should call dispatch function with correct data', () => {
    const dataToDispatch = getData('mocked', 'store');
    const dispatch = jest.fn();
    const getState = () => ({ mocked: { store: { endpoint: 'test' } } });

    dataToDispatch(dispatch, getState);

    expect(dataToDispatch).toBeInstanceOf(Function);
    expect(dispatch.mock.calls[0][0]).toMatchObject({
      types: [TABLE_DATA_GET_DATA, TABLE_DATA_GET_DATA_SUCCESS, TABLE_DATA_GET_DATA_ERROR],
      payload: {
        reducer: 'mocked',
        prop: 'store',
      },
    });

    expect(dispatch.mock.calls[0][0].promise).toBeInstanceOf(Function);
  });

  test('"refresh" data should call dispatch function', () => {
    const dataToDispatch = refreshData('mocked', 'store');
    const dispatch = jest.fn();

    dataToDispatch()(dispatch);

    expect(dataToDispatch).toBeInstanceOf(Function);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('"setLimit" data should call dispatch function', () => {
    const dataToDispatch = setLimit('mocked', 'store');
    const dispatch = jest.fn();

    dataToDispatch(-1)(dispatch);

    expect(dataToDispatch).toBeInstanceOf(Function);
    expect(dispatch.mock.calls[0][0]).toMatchObject({
      type: TABLE_DATA_SET_LIMIT,
      payload: { _limit: -1 },
    });
  });

  test('"setPage" data should call dispatch function', () => {
    const dataToDispatch = setPage('mocked', 'store');
    const dispatch = jest.fn();

    dataToDispatch(-1)(dispatch);

    expect(dataToDispatch).toBeInstanceOf(Function);
    expect(dispatch.mock.calls[0][0]).toMatchObject({
      type: TABLE_DATA_SET_PAGE,
      payload: { _page: -1 },
    });
  });

  [setLimit, setPage].forEach(func => {
    test(`${func.name} should dispatch getData action`, () => {
      const dataToDispatch = setPage('mocked', 'store');
      const getState = () => ({ mocked: { store: { endpoint: 'test' } } });
      const dispatch = jest.fn();
      const dispatch2 = jest.fn();

      dataToDispatch(-1)(dispatch);
      dispatch.mock.calls[1][0](dispatch2, getState);

      expect(dispatch2.mock.calls[0][0]).toMatchObject({
        types: [TABLE_DATA_GET_DATA, TABLE_DATA_GET_DATA_SUCCESS, TABLE_DATA_GET_DATA_ERROR],
        payload: {
          reducer: 'mocked',
          prop: 'store',
        },
      });

      expect(dispatch2.mock.calls[0][0].promise).toBeInstanceOf(Function);
    });
  });

  test('"refreshData" should return promise with response object (200)', () => {
    const mockedFetchResponse = { response: '__true__' };
    const refData = refreshData('store', 'all');
    const store = mockStore({
      store :{
        all: createDataState({ endpoint: '/posts' })
      },
    });

    fetch.mockResponse(JSON.stringify(mockedFetchResponse), { status: 200 });

    return store.dispatch(refData()).then((result) => {
      expect(result).toMatchObject({
        type: TABLE_DATA_GET_DATA_SUCCESS,
        result: mockedFetchResponse,
      });
    });
  });

  test('"refreshData" should return promise with response object (404)', () => {
    const mockedFetchResponse = '__MY_ERROR__';
    const refData = refreshData('store', 'all');
    const store = mockStore({
      store :{
        all: createDataState({ endpoint: '/posts' })
      },
    });

    fetch.mockResponse(mockedFetchResponse, { status: 404 });

    return store.dispatch(refData()).then((result) => {
      expect(result).toMatchObject({
        type: TABLE_DATA_GET_DATA_ERROR,
        error: `(404) ${mockedFetchResponse}`,
      });
    });
  });
});