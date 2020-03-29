import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import AppRouter from 'router';
import 'assets/css/material-dashboard-react.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <AppRouter />
  </Router>,
  document.getElementById('root')
);
