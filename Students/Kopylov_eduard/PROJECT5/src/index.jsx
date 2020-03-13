import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import Messages from './components/MessagesField/MessagesField.jsx';
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header.jsx';
import ChatList from './components/ChatList/ChatList.jsx';
import Layout from './components/Layout/Layout.jsx'
import {Provider} from 'react-redux';
import initStore from './store/store.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from './router/router.jsx';
import {BrowserRouter} from 'react-router-dom';


ReactDom.render(
    <BrowserRouter>
            <Provider store = {initStore()}>
                <MuiThemeProvider>
                <Router />
                    {/* <Layout usr = {user}/> */}

                </MuiThemeProvider>
           
            </Provider>
    
    </BrowserRouter>
    
    ,
    document.getElementById('app')
    
);