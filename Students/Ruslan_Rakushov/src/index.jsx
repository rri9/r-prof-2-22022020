import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import initStore, { history } from './store/store.js';

import Router from './Router/Router.jsx';

ReactDOM.render(
  <Provider store={ initStore() }>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('app'),
);