import React from 'react';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'react-router-redux';
import { Content } from 'jsx/components/Content';

const mountConentElement = (pathname) => mount(
  <ConnectedRouter history={{ listen: () => {}, location: { pathname } }} store={{ dispatch: () => {} }} >
    <Content
      location={{ pathname }}
      routes={[
        { title: 'One', path: '/one', component: () => <span className="one" /> },
        { title: 'Two', path: '/two', component: () => <span className="two" /> },
        { title: '404', path: '*', component: () => <span className="not-found" /> },
      ]}
    />
  </ConnectedRouter>
);

describe('<Content/> Component', () => {
  test('It should mount properly with className="content"', () => {
    const ContentElement = mountConentElement('/one');

    expect(ContentElement.find('.content').length).toBe(1);
  });

  test('It should show appropriate component depending on route path', () => {
    const ContentElement1 = mountConentElement('/one').find('Content');
    const ContentElement2 = mountConentElement('/two').find('Content');
    const ContentElement3 = mountConentElement('/not-existent').find('Content');


    expect(ContentElement1.find('.one').length).toBe(1);
    expect(ContentElement2.find('.two').length).toBe(1);
    expect(ContentElement3.find('.not-found').length).toBe(1);
  });
});