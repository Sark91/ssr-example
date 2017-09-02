import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import Title from 'react-title-component';

const getActiveTitle = (routes, { pathname }) => {
  const found = routes.find(route => route.path === pathname);

  if (found) {
    return found.title;
  }

  return routes.find(route => route.path === '*').title;
};

const Content = ({ routes, location }) => (
  <div className="content">
    <Title render={getActiveTitle(routes, location)} />

    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </div>
);

Content.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Content.defaultProps = {
  routes: [],
};

export {
  Content,
};

export default withRouter(Content);