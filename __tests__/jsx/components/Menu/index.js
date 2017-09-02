import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu } from 'jsx/components/Menu';

describe('<Menu/> Component', () => {
  test('It should mount properly with className="menu"', () => {
    const MenuElement = shallow(<Menu />);

    expect(MenuElement.find('.menu').length).toBe(1);
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

  test('It should properly handle item with "hideInMenu" property', () => {
    const MenuElement = mount(
      <Menu
        items={[
          { title: 'One', path: '/', component: () => null, hideInMenu: true, },
          { title: 'Two', path: '/index', component: () => null , hideInMenu: true,},
        ]}
      />
    );

    expect(MenuElement.find('.list-group-item').length).toBe(0);
  });
});