import React from 'react';
import PropTypes from 'prop-types';
import stores, { history } from 'stores';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Container, Row, Col } from 'reactstrap';
import Menu from 'jsx/components/Menu';
import Content from 'jsx/components/Content';

import Posts from 'jsx/containers/Posts';
import Albums from 'jsx/containers/Albums';
import Todos from 'jsx/containers/Todos';

import './style.scss';


const routes = [
  { title: 'Home', exact: true, path: '/', component: () => <p>Home</p> },
  { title: 'Posts', path: '/posts', component: Posts },
  { title: 'Albums', path: '/albums', component: Albums },
  { title: 'Todos', path: '/todos', component: Todos },
  { title: '404 - Not Found', path: '*', component: () => <span>404</span>, hideInMenu: true },
];

const App = ({ store }) => (
  <div className="app">
    <Provider store={store || stores}>{/* "|| sores" it's a fallback for tests */}
      <ConnectedRouter history={history}>
        <Container>
          <Row>
            <Col sm="3">
              <Menu items={routes} />
            </Col>
            <Col sm="9">
              <Content routes={routes} />
            </Col>
          </Row>
        </Container>
      </ConnectedRouter>
    </Provider>
  </div>
);

App.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  store: null,
};

export default App;