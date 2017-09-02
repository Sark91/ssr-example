import React from 'react';
import stores, { history } from 'stores';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Container, Row, Col } from 'reactstrap';
import Menu from 'jsx/components/Menu';
import Content from 'jsx/components/Content';

import './style.scss';

const routes = [
  { title: 'Home', exact: true, path: '/', component: () => <p>Home</p> },
  { title: 'Posts', path: '/posts', component: () => <p>Posts</p> },
  { title: 'Albums', path: '/albums', component: () => <span>Albums</span> },
  { title: 'Todos', path: '/todos', component: () => <span>Todos</span> },
  { title: '404 - Not Found', path: '*', component: () => <span>404</span>, hideInMenu: true },
];

const App = () => (
  <div className="app">
    <Provider store={stores}>
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

export default App;