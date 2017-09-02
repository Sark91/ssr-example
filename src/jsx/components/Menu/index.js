import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Menu = ({ items }) => (
  <ListGroup className="menu">
    {items.map(item => (
      <ListGroupItem
        key={item.path}
        active
        tag="a"
        href={item.path}
        action
      >
        {item.title}
      </ListGroupItem>
    ))}
  </ListGroup>
);

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired, // @fixme: verify proptype for element class
    title: PropTypes.string.isRequired,
  })),
};

Menu.defaultProps = {
  items: [],
};

export {
  Menu,
};

export default Menu;