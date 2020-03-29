import React, { useEffect, useContext } from 'react';
import { Route as RRDRoute, useRouteMatch } from 'react-router-dom';
import RouterContext from 'contexts/Router';
import PropTypes from 'prop-types';

function AwareRoute({ name, path, ...rest }) {
  const match = useRouteMatch(path);
  const { setActiveRouteName } = useContext(RouterContext);
  useEffect(() => {
    if (match) {
      setActiveRouteName(name);
    }
  }, [match, setActiveRouteName, name]);

  return <RRDRoute to={path} {...rest} />;
}

AwareRoute.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

function Route({
  name, ...rest
}) {
  if (name) {
    return <AwareRoute name={name} {...rest} />;
  }
  return <RRDRoute {...rest} />;
}

Route.defaultProps = {
  name: null,
};

Route.propTypes = {
  name: PropTypes.string,
};

export default Route;
