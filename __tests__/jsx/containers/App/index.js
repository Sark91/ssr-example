import React from 'react';
import { shallow, mount } from 'enzyme';
import App from 'jsx/containers/App';

describe('<App/> Component', () => {
  test('It should mount properly with className="app"', () => {
    const AppElement = shallow(<App />);

    expect(AppElement.is('.app')).toBe(true);
  });

  test('It should contains menu', () => {
    const AppElement = mount(<App />);

    expect(AppElement.find('.menu').length).toBe(1);
  });
});