import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';

import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import initStore from './store/store.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/store.js'

//persist
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor } = initStore();

ReactDom.render (
    <Provider store = { store }>
        <PersistGate loading={ null } persistor={ persistor }>
           <ConnectedRouter history={history}>
               <MuiThemeProvider>
                   <Router />
               </MuiThemeProvider>
           </ConnectedRouter>
       </PersistGate>
    </Provider>
   
    , document.getElementById('app')
);