import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router';

const Menu = ({ items }) => (
  <div>
    <ListGroup className="menu">
      {items
        .filter(item => !item.hideInMenu)
        .map(item => (
          <ListGroupItem
            key={item.path}
            active
            tag="a"
            href={item.path}
            action
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
};

Menu.defaultProps = {
  items: [],
};

export {
  Menu,
};

export default withRouter(Menu);