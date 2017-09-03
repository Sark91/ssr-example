import * as tableDataActionTypes from 'stores/table-data/actionTypes';
import reducer from 'stores/albums/reducer';
import { createDataState } from 'stores/table-data/reducer';

describe('albums reducer', () => {
  test('state should be same on unknown action type', () => {
    const state = {};
    const newState = reducer(state, { type: '__UNKNOWN_ACTION__' });

    expect(state === newState).toBe(true);
  });

  test('it should return new state on table data action', () => {
    for (const actionType in tableDataActionTypes) {
      const state = {
        all: createDataState({ endpoint: '/albums' }),
      };

      const newState = reducer(state, {
        type: actionType,
        payload: { reducer: 'albums', prop: 'all' }
      });

      expect(state === newState).toBe(false);

    }
  });
});