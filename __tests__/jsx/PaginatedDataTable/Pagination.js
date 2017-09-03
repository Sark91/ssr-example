import React from 'react';
import { mount } from 'enzyme';
import { Pagination } from 'jsx/components/PaginatedDataTable/Pagination';

const mountElement = (
  {
    data = [{ id: 1}],
    dispatch = () => {},
    query = { _limit: 12, _page: 1 },
    pages = 9,
  } = {}
) => mount(
  <Pagination
    model={{ id: 'Id' }}
    data={data}
    reducer="posts"
    prop="all"
    dispatch={dispatch}
    query={query}
    pages={pages}
  />
);

describe('<Content/> Component', () => {
  test('It should mount properly', () => {
    const element = mountElement();

    expect(element.is('Pagination')).toBe(true);
  });

  test('"prev" button should be disabled on first page', () => {
    const element = mountElement();

    expect(element.find('.paginated-data-table__prev.disabled').length).toBe(1);
  });

  test('"next" button should be disabled on last page', () => {
    const element = mountElement({ query: { _limit: 12, _page: 9 } });

    expect(element.find('.paginated-data-table__next.disabled').length).toBe(1);
  });

  test('It should show page/pages info', () => {
    const element = mountElement({ pages: 17, query: { _limit: 12, _page: 2 } });

    expect(element.find('.paginated-data-table__page-info').text()).toMatch(
      'Page: 2 / 17'
    );
  });

  test('It should activate chosen page', () => {
    const element = mountElement({ pages: 17, query: { _limit: 12, _page: 3 } });

    expect(element.find('.paginated-data-table__page-3.active').length).toBe(1);
    expect(element.find('.paginated-data-table__page.active').length).toBe(1);
  });

  test('It should activate chosen "items on page" button', () => {
    const element = mountElement({ pages: 17, query: { _limit: 24, _page: 3 } });

    expect(element.find('.paginated-data-table__items-on-page-24.active').length).toBe(1);
    expect(element.find('.paginated-data-table__items-on-page.active').length).toBe(1);
  });


  [
    '.paginated-data-table__prev',
    '.paginated-data-table__page-1',
    '.paginated-data-table__items-on-page-12',
    '.paginated-data-table__next'
  ].forEach((className) => {
    test(`Pagination buttons should dispatch actions => ${className}`, () => {
      const dispatch = jest.fn();
      const element = mountElement({ dispatch, pages: 17, query: { _limit: 24, _page: 3 } });

      element.find(className).find('a').first().simulate('click');
      expect(dispatch).toHaveBeenCalled();
    });
  });

});