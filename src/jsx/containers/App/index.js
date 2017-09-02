import React from 'react';
import stores, { history } from 'stores';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Container, Row, Col } from 'reactstrap';
import Menu from 'jsx/components/Menu';
import './style.scss';

const routes = [
  { title: 'One', path: '/one', component: () => null },
  { title: 'Two', path: '/two', component: () => <span>two</span> },
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