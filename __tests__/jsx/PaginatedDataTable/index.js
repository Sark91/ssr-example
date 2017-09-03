import React from 'react';
import { mount } from 'enzyme';
import { PaginatedDataTable } from 'jsx/components/PaginatedDataTable';
import mockStore from '../../stores/_mockStore';
import { Provider } from 'react-redux';

const initialState = {
  posts: {
    all: {
      data: [{ id: 1}],
      pages: 9,
      query: {
        _page: 1,
        _limit: 12,
      }
    }
  }
};

const mountElement = (
  {
    data = [{ id: 1}],
    dispatch = () => {},
    status = 'success',
    error = null,
  } = {}
) => mount(
  <Provider store={mockStore(initialState)}>
    <PaginatedDataTable
      model={{ id: 'Id' }}
      data={data}
      reducer="posts"
      prop="all"
      dispatch={dispatch}
      status={status}
      error={error}
    />
  </Provider>
);

describe('<Content/> Component', () => {
  test('It should mount properly', () => {
    const element = mountElement();

    expect(element.find('PaginatedDataTable').length).toBe(1);
  });

  test('It should contains Pagination', () => {
    const element = mountElement();

    // 4 - because BootstrapPagination is seen as 'Pagination' by enzyme too
    expect(element.find('Pagination').length).toBe(4);
  });

  test('It should show info if data is loading', () => {
    const element = mountElement({ status: 'fetch' });

    expect(element.find('.paginated-data-table__info-block').text()).toMatch(
      'Data is loading'
    );
  });

  test('It should show info if got error', () => {
    const element = mountElement({ status: 'error', error: 'my_error' });

    expect(element.find('.paginated-data-table__info-block').text()).toMatch(
      'Cannot fetch data, reason: my_error'
    );
  });

  test('It should show info if no data found', () => {
    const element = mountElement({ data: [] });

    expect(element.find('.paginated-data-table__info-block').text()).toMatch(
      'No data to show'
    );
  });

  test('It should contains DataTable', () => {
    const element = mountElement();

    // 4 - because BootstrapPagination is seen as 'Pagination' by enzyme too
    expect(element.find('DataTable').length).toBe(1);
  });

  test('It should dispatch an action on mount', () => {
    const dispatch = jest.fn();
    mountElement({ dispatch });

    expect(dispatch).toHaveBeenCalled();
  });
});