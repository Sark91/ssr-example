import React from 'react';
import stores, { history } from 'stores';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Container, Row, Col } from 'reactstrap';
import Menu from 'jsx/components/Menu';
import './style.scss';

const routes = [
  { title: 'SSR Example', path: '/', component: () => null, hideInMenu: true },
  { title: 'Posts', path: '/posts/:id', component: () => null },
  { title: 'Albums', path: '/albums', component: () => <span>two</span> },
  { title: 'Todos', path: '/todos', component: () => <span>two</span> },
  { title: '404 - Not Found', path: '*', component: () => <span>xD</span>, hideInMenu: true },
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
          </Row>
        </Container>
      </ConnectedRouter>
    </Provider>
  </div>
);

export default App;