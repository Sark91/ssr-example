import {
  createDataState,
  isTableDataActionType,
  reducer,
} from 'stores/table-data/reducer';

import * as tableDataActionTypes from 'stores/table-data/actionTypes';

describe('table-data reducer', () => {
  test('"createDataState" should return correct data shape', () => {
    expect(createDataState({ endpoint: '/posts' })).toMatchObject({
      endpoint: '/posts',
      query: {
        _page: expect.any(Number),
        _limit: expect.any(Number),
      },
      status: 'success',
      error: null,
      data: expect.any(Array),
    });
  });

  test('"isTableDataActionType" should return true on every table data action type', () => {
    for (const actionType in tableDataActionTypes) {
      expect(isTableDataActionType('store', { type: actionType, payload: { store: 'store' } })).toBe(true);
    }
  });

  test('"reducer" - TABLE_DATA_GET_DATA', () => {
    const mockedStore = {
      all: createDataState({ endpoint: '/posts' }),
    };

    const action = {
      type: tableDataActionTypes.TABLE_DATA_GET_DATA,
      payload: { prop: 'all' },
    };

    const newState = reducer(mockedStore, action);

    expect(mockedStore === newState).toBe(false);
    expect(newState.all).toMatchObject({
      status: 'fetch',
      data: [],
      error: null,
    });
  });

  test('"reducer" - TABLE_DATA_GET_DATA_SUCCESS', () => {
    const mockedStore = {
      all: {
        ...createDataState({ endpoint: '/posts' }),
        status: 'other',
      },
    };

    const action = {
      type: tableDataActionTypes.TABLE_DATA_GET_DATA_SUCCESS,
      payload: { prop: 'all' },
      result: [1],
    };

    const newState = reducer(mockedStore, action);

    expect(mockedStore === newState).toBe(false);
    expect(newState.all).toMatchObject({
      status: 'success',
      data: [1],
      error: null,
    });
  });

  test('"reducer" - TABLE_DATA_GET_DATA_ERROR', () => {
    const mockedStore = {
      all: {
        ...createDataState({ endpoint: '/posts' }),
        status: 'other',
      },
    };

    const action = {
      type: tableDataActionTypes.TABLE_DATA_GET_DATA_ERROR,
      payload: { prop: 'all' },
      error: 'error',
    };

    const newState = reducer(mockedStore, action);

    expect(mockedStore === newState).toBe(false);
    expect(newState.all).toMatchObject({
      status: 'error',
      error: 'error',
    });
  });

  test('"reducer" - TABLE_DATA_SET_LIMIT', () => {
    const mockedState = {
      all: createDataState({ endpoint: '/posts' }),
    };

    const action = {
      type: tableDataActionTypes.TABLE_DATA_SET_LIMIT,
      payload: { prop: 'all', _limit: -1 },
    };

    const newState = reducer(mockedState, action);

    expect(mockedState === newState).toBe(false);
    expect(newState.all.query._limit).toBe(-1);

    newState.all.query._limit = mockedState.all.query._limit;

    expect(mockedState).toMatchObject(newState); // check reducer changed only _limit
  });

  test('"reducer" - TABLE_DATA_SET_PAGE', () => {
    const mockedState = {
      all: createDataState({ endpoint: '/posts' }),
    };

    const action = {
      type: tableDataActionTypes.TABLE_DATA_SET_PAGE,
      payload: { prop: 'all', _page: -1 },
    };

    const newState = reducer(mockedState, action);

    expect(mockedState === newState).toBe(false);
    expect(newState.all.query._page).toBe(-1);

    newState.all.query._page = mockedState.all.query._page;

    expect(mockedState).toMatchObject(newState); // check reducer changed only _page
  });
});
