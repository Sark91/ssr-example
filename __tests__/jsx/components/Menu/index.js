import React from 'react';
import { mount } from 'enzyme';
import { Menu } from 'jsx/components/Menu';

const mountMenuElement = (hideInMenu = false, push = () => {}) => mount(
  <Menu
    location={{ pathname: '/' }}
    history={{ push }}
    items={[
      { title: 'One', path: '/', component: () => null, hideInMenu },
      { title: 'Two', path: '/index', component: () => null , hideInMenu },
    ]}
  />
);

describe('<Menu/> Component', () => {
  test('It should mount properly with className="menu"', () => {
    const MenuElement = mountMenuElement();

    expect(MenuElement.find('.menu').length).toBe(1);
  });

  test('It should contains items, when prop items is not empty', () => {
    const MenuElement = mountMenuElement();

    expect(MenuElement.find('.list-group-item').length).toBe(2);
  });

  test('It should properly handle item with "hideInMenu" property', () => {
    const MenuElement = mountMenuElement(true);

    expect(MenuElement.find('.list-group-item').length).toBe(0);
  });

  test('It should be active when item.path equals location.pathname prop', () => {
    const MenuElement = mountMenuElement();

    expect(MenuElement.find('ul.menu').childAt(0).find('.active').length).toBe(1);
    expect(MenuElement.find('ul.menu').childAt(1).find('.active').length).toBe(0);
  });

  test('It should call func in history.push property', () => {
    const callback = jest.fn();
    const MenuElement = mountMenuElement(false, callback).find('ul.menu').childAt(0).find('li');

    MenuElement.simulate('click');

    expect(callback).toHaveBeenCalled();
  });
});