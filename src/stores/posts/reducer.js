import {
  reducer,
  isTableDataActionType,
  createDataState,
} from 'stores/table-data/reducer';

export const initialState = Object.freeze({
  all: createDataState({ endpoint: '/posts' }),
});

export default (state = initialState, action = {}) => {
  if (isTableDataActionType('posts', action)) {
    return reducer(state, action);
  }

  return state;
};