import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import initStore, { history } from './store/store.js';

import Layout from './Components/Layout/Layout.jsx';

ReactDOM.render(
  <Provider store={ initStore() }>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('app'),
);