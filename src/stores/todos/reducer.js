import {
  reducer,
  isTableDataActionType,
  createDataState,
} from 'stores/table-data/reducer';

export const initialState = Object.freeze({
  all: createDataState({ endpoint: '/todos' }),
});

export default (state = initialState, action = {}) => {
  if (isTableDataActionType('todos', action)) {
    return reducer(state, action);
  }

  return state;
};