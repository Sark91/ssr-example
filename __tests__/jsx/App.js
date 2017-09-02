import React from 'react';
import { shallow } from 'enzyme';
import App from 'jsx/App';

describe('<App/> Component', () => {
  test('It should mount properly with className="app"', () => {
    const AppElement = shallow(<App />);

    expect(AppElement.is(".app")).toBe(true);
  });
});