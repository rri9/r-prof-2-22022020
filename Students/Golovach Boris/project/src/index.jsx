import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';

import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import initStore from './store/store.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDom.render (
    
    <Provider store = { initStore() }>
        <BrowserRouter>
            <MuiThemeProvider>
                <Router />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
   
    , document.getElementById('app')
);