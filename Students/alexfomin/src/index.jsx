import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import initStore, { history } from './store/store.js'
import Router from './router/router.jsx'
//import { BrowserRouter } from 'react-router-dom'

//let InitStore = initStore()


//console.log(initStore.getState())

  ReactDom.render (
        <Provider store = { initStore() }>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        </Provider>
    , document.getElementById('app')
);

