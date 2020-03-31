import React from 'react';
import { Route, Switch, Redirect } from 'components/Router';
import { RouteProvider } from 'contexts/Router';
import useOnOrderCreate from 'hooks/useOnOrderCreate';
import { withSnackbar } from 'notistack';
import state from 'constants/state';
import Error from './Error';
import LandingPage from './LandingPage';
import State from './State';

function RootRouter() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Redirect to="/error/404" />
    </Switch>
  );
}

const Router = withSnackbar(({ enqueueSnackbar }) => {
  useOnOrderCreate((orders) => {
    orders.forEach((order) => {
      const message = `An order from ${state[order.from]} to ${state[order.to]} has been placed`;
      enqueueSnackbar(message, {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
    });
  });

  return (
    <Switch>
      <Route path="/state/:stateId" component={State} />
      <Route path="/error" component={Error} />
      <Route path="/" component={RootRouter} />
    </Switch>
  );
});

export default function RouterWrapper(props) {
  return (
    <RouteProvider>
      <Router {...props} />
    </RouteProvider>
  );
}
