import React from 'react';
import { Route, Switch, Redirect } from 'components/Router';
import { RouteProvider } from 'contexts/Router';
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

function Router() {
  return (
    <Switch>
      <Route path="/state/:stateId" component={State} />
      <Route path="/error" component={Error} />
      <Route path="/" component={RootRouter} />
    </Switch>
  );
}

export default function RouterWrapper(props) {
  return (
    <RouteProvider>
      <Router {...props} />
    </RouteProvider>
  );
}
