import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
//import { Container, Badge, Row, Col } from 'reactstrap';
//import Messages from './components/MessagesField/MessagesField.jsx'
//import Search from './components/Search/Search.jsx'
//import SendButton from './components/Button/Button.jsx';
import { Provider } from 'react-redux'
import initStore from './store/store.js'
import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'

//let InitStore = initStore()


//console.log(initStore.getState())

  ReactDom.render (
    <BrowserRouter>
        <Provider store = { initStore() }>
                <Router />
        </Provider>
    </BrowserRouter>
    , document.getElementById('app')
);

