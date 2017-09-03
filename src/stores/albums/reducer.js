import {
  reducer,
  isTableDataActionType,
  createDataState,
} from 'stores/table-data/reducer';

export const initialState = Object.freeze({
  all: createDataState({ endpoint: '/albums' }),
});

export default (state = initialState, action = {}) => {
  if (isTableDataActionType('albums', action)) {
    return reducer(state, action);
  }

  return state;
};