import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router';

const isItemActive = (item, location) => item.path === location.pathname;

const Menu = ({ items, location, history: { push } }) => (
  <div>
    <ListGroup className="menu">
      {items
        .filter(item => !item.hideInMenu)
        .map(item => (
          <ListGroupItem
            key={item.path}
            active={isItemActive(item, location)}
            onClick={() => push(item.path)}
          >
            {item.title}
          </ListGroupItem>
        ))
      }
    </ListGroup>
  </div>
);

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired, // @fixme: verify proptype for element class
    title: PropTypes.string.isRequired,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Menu.defaultProps = {
  items: [],
};

export {
  Menu,
};

export default withRouter(Menu);