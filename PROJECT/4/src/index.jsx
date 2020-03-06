import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';

import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import initStore from './store/store.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDom.render (
    <BrowserRouter>
        <Provider store = { initStore() }>
            <MuiThemeProvider>
                <Router />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>
    , document.getElementById('app')
);