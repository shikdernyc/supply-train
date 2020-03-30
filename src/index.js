import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import 'assets/css/material-dashboard-react.css';
import { SettingsProvider } from 'contexts/Settings';
import App from './App';

//Importing to update Firestore data
// import './services/database/updateDB';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Router>,
  document.getElementById('root')
);
