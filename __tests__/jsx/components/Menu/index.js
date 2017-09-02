import React from 'react';
import { shallow, mount } from 'enzyme';
import Menu from 'jsx/components/Menu';

describe('<Menu/> Component', () => {
  test('It should mount properly with className="app"', () => {
    const MenuElement = shallow(<Menu />);

    expect(MenuElement.is(".menu")).toBe(true);
  });

  test('It should contains items, when prop items is not empty', () => {
    const MenuElement = mount(
      <Menu
        items={[
          { title: 'One', path: '/', component: () => null },
          { title: 'Two', path: '/index', component: () => null },
        ]}
      />
    );

    expect(MenuElement.find('.list-group-item').length).toBe(2);
  });

  // test('It should contains menu', () => {
  //   const AppElement = mount(<App />);
  //
  //   expect(AppElement.contains(".menu")).toBe(true);
  // });
});