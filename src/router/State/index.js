import React from 'react';
import { Switch, Redirect, Route } from 'components/Router';
import PropTypes from 'prop-types';
import DashboardLayout from 'layouts/Dashboard';
import { CurrentStateProvider } from 'contexts/CurrentState';
import Overview from './Overview';
import StateData from './StateData';
import Orders from './Orders';

function DashboardRouter({
  match: {
    url,
    params: {
      stateId,
    },
  },
}) {
  return (
    <CurrentStateProvider stateKey={stateId}>
      <DashboardLayout>
        <Switch>
          <Route
            exact
            name="Overview"
            path={`${url}/overview`}
            component={Overview}
          />
          <Route
            exact
            name="State Data"
            path={`${url}/state-data`}
            component={StateData}
          />
          <Route
            exact
            name="State Data"
            path={`${url}/orders`}
            component={Orders}
          />
          <Redirect from={`${url}`} to={`${url}/overview`} />
        </Switch>
      </DashboardLayout>
    </CurrentStateProvider>
  );
}

DashboardRouter.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      stateId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DashboardRouter;
